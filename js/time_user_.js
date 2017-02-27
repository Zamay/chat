/**
 * Created by zamaj on 03.02.2017.
 */
window.onload = function () {
    //time
    (function () {
        var date = new Date();
        var times = $('.local_time>p')[0];
        var secs = date.getSeconds();
        var mins = date.getMinutes();
        var hours = date.getHours();
        if (secs < 10) {
            secs = "0" + secs;
        }
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }

        times.innerHTML = "Your local time is: " + hours + ':' + mins + ':' + "<span style = 'color:kblue'>" + secs + "</span>";
        window.setTimeout(arguments.callee, 1);

    })();

    //пользователей онлайн
    (function () {

        var usersOnline = $(".list_user>ul>li").length;
        $(".online")['0'].innerHTML = ("Online: " + usersOnline );
        window.setTimeout(arguments.callee, 1);
    })();

    //колво символов
    (function () {
        $('#textarea').keyup(function () {

            var count = $(this).val().length;
            $('.info>ul>li')[0].innerHTML = (count + ' characters entered');

            var words = $(this).val().split(/[\S\.\?]+/).length - 1;
            $('.info>ul>li')[1].innerHTML = (words + ' letters entered');

            var whitespaces = $(this).val().split(/\s/).length - 1;
            $('.info>ul>li')[2].innerHTML = (whitespaces + ' whitespace characters entered');


            var marks = $(this).val().split(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/).length - 1;
            $('.info>ul>li')[3].innerHTML = (marks + ' punttuation marks entered');

        });
    })();


    // add User для проверки .
    $(document).on('click', '.addUser', function () {
        var usersOnline = $(".list_user>ul>li").length + 1;

        $('<li>', {}).appendTo('.list_user ul');

        $('<a>', {
            class: 'user',
            href: '#tab' + usersOnline,
            text: 'New user ' + usersOnline
        }).appendTo('.list_user li:last');

        // $('<i>', {
        //     class: 'close_user',
        //     text: ' [x]'
        // }).appendTo('.list_user li a:last');
    });

    // delete User
    // $(document).on('click', '.close_user', function () {
    //     $(this).parent().parent().remove();
    //
    // });

    $(document).on('click', '.btn ', function () {
        $(this).toggleClass("form_active");

    });

    $('.toolbar button[data-func]').click(function () {
        document.execCommand($(this).data('func'), false);
    });

    // login

    $(document).on('click', "input:submit[name=login]", function () {
        var username = document.querySelector("input[name=username]");
        if (username.value != '') {
            $.ajax({
                url: "http://192.168.1.169:8081/user/register",
                type: "POST",
                data: JSON.stringify(
                    {
                        "username": username.value
                    }
                ),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $(".__login").html(data.username);
                }
            });

            function delBlockUser() {
                $(".body_login").remove();
            }

            setTimeout(delBlockUser, 1000);

        }

    });

    //Получение пользователей

    var request1 = new XMLHttpRequest();
    request1.open('GET', 'http://192.168.1.169:8081/user', true);

    request1.onload = function() {
        if (request1.status >= 200 && request1.status < 400) {
            var response = request1.responseText;

            JSON.parse(response).forEach(
                function (obj, index) {

                    if (obj.username != undefined){
                        var ul = document.querySelector(".list_user");
                        console.log(ul);
                        ul.lastElementChild.innerHTML += `<li><a href = #${obj.user_id} class="user">${obj.username} </a></li>`;
                    }
                }
            )
        } else {
            // Обработчик ответа в случае ошибки
        }
    };
    request1.onerror = function() {
        // Обработчик ответа в случае неудачного соеденения
    };
    request1.send();


    // Получения сообщения

    var request = new XMLHttpRequest();
    request.open('GET', 'http://192.168.1.169:8081/messages', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var response = request.responseText;


            JSON.parse(response).forEach(
                function (obj, index) {
                    //console.log(obj);
                    //if (obj.username == undefined){
                    var cont = document.querySelector("#wrap-tab-content");
                    var newDiv = document.createElement('div');
                    // console.log(cont[index]);

                    newDiv.innerHTML = `<div id="${obj.user_id}">
                                <div class="tab-content">
                                <p><b>${obj.user_id}:</b> ${obj.message}</p>
                                </div></div>`;
                    cont.appendChild(newDiv);

                    // cont.innerHTML = `<div id="${obj.user_id}">
                    //                      <div class="tab-content">
                    //                      <p>Hello ${obj.user_id}</p></div></div>`;


                    //}
                }
            )
        } else {
            // Обработчик ответа в случае ошибки
        }
    };
    request.onerror = function() {
        // Обработчик ответа в случае неудачного соеденения
    };
    request.send();

};









