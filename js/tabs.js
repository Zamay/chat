/**
 * Created by zamaj on 03.02.2017.
 */
$(function () {

    $(".wrap-tab-content div").hide();
    $(".tabs li a").removeClass("active");
    $(".main_menu a").addClass("active");

    if ($(".main_menu a").hasClass("active")) {
        $(".wrap-tab-content #main_menu").show();
    }


    // var countTabs;
    // function createTab() {
    //     countTabs = parseInt($(".tabs li a").length)+1;
    //
    //     $(".wrap-tab-content div").hide();
    //     $(".tabs li a").removeClass("active");
    //
    //     var myLi = $('<li>', {
    //         class: 'tab' + countTabs
    //     }).appendTo('.tabs');
    //
    //     var myA = $('<a>', {
    //         href: '#' + countTabs,
    //         text: 'New tab '
    //     }).appendTo('.tabs li:last').addClass("active");
    //
    //     var myIcon = $('<i>', {
    //         class: 'ion-close-circled'
    //     }).appendTo('.tabs li a:last');
    //
    //     var myDiv = $('<div>', {
    //         'id': countTabs,
    //         text: countTabs + ' lorem ipsum'
    //     }).appendTo('.wrap-tab-content');
    //
    //     return false;
    // }

    $(document).on('click', '.user', function () {
        if ($('.wrap-tab-content div').is(this.hash)) {
            $(".wrap-tab-content div").hide();
            $(this.hash).show();



            //....
            return false;
        } else {

            if ($(".tabs li a").length >= 7) {
                alert('Close tabs! Limit 7');
            }
            else {
                //createTab();
                countTabs = parseInt($(".tabs li a").length) + 1;

                $(".wrap-tab-content div").hide();
                $(".tabs li a").removeClass("active");

                $('<li>', {
                    class: 'tab' + (countTabs-1)
                }).appendTo('.tabs');

                $('<a>', {
                    href: this.hash.replace('', ''),
                    text: 'UserMane'// Значение нажатой вкладки слева
                }).appendTo('.tabs li:last').addClass("active");

                $('<i>', {
                    class: 'ion-close-circled'
                }).appendTo('.tabs li a:last');

                $('<div>', {
                    id: this.hash.replace('#', '')
                }).text('New div id: ' + this.hash).appendTo('.wrap-tab-content');
            }
            return false;
        }
    });


    $(document).on('click', '.tabs li a', function () {
        $(".wrap-tab-content div").hide();
        $(this.hash).show();
        $(".tabs li a").removeClass("active");
        $(this).addClass("active");

        return false;
    });


    $(document).on('click', '.ion-close-circled', function () {
        $(this).closest("li").remove();
        var tabHref = $(this).parent().attr('href');
        $(tabHref).remove();

        var last = $('.tabs li:last-child')[0];
        var a = $(last).children()
        a.addClass("active");




        return false;
    });
});


//login

function logine() {
    var username = document.querySelector("input[name=username]");

    //переписать проверку ! а она нужна ?
    if (username.value != '' & username.value != ' ' & username.value != '.' & username.value != '-' & username.value != '_' ) {
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
            },
            error: function (data, status) {
                $(".__login").html(username.value);

                console.log(data, status);
            }

        });

        function delBlockUser() {
            $(".body_login").remove();
        }

        setTimeout(delBlockUser, 1000);
    }
    return false;
};

//Получение пользователей
var userAll = {};
function users() {
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.169:8081/user',
        success: function (data) {  // Обработчик успешного ответа

            $.parseJSON(JSON.stringify(data)).forEach(
                function (obj) {
                    if (obj.username != "" || obj.user_id != "") {
                        var users = document.querySelector('.list_user');
                        var userId = obj.user_id;

                        if (!userAll[userId]) {
                            userAll[userId] = true
                            var ul = document.querySelector(".list_user");
                            ul.lastElementChild.innerHTML += `<li><a href = #${obj.user_id} class="user">${obj.username} </a></li>`;

                        }
                    }
                }
            )


        },
        error: function (data, status) {  // Обработчик ответа в случае ошибки
            console.error(data, status);
        }
    });
}
setInterval(users, 4000);


// Получения сообщения

var messagesAll = {};
function messages() {
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.169:8081/messages',
        success: function (data) {  // Обработчик успещного ответа

            $.parseJSON(JSON.stringify(data)).forEach(
                function (obj) {
                    if (obj.user_id != undefined) {
                        var messages = document.querySelector('.wrap-tab-content');
                        var userId = obj.user_id;
                        var messag = messages.querySelector('#' + userId);

                        if (messagesAll[userId]) {
                            messagesAll[userId] = false;
                            messages.querySelector('#' + userId).innerHTML += `<p><b>${obj.user_id}:</b> ${obj.message}</p>`;
                        } else {
                            messagesAll[userId] = true;
                            var newDiv = document.createElement('div');
                            newDiv.id = obj.user_id;
                            newDiv.innerHTML = `<p><b>${obj.user_id}:</b> ${obj.message}</p>`;
                            messages.appendChild(newDiv);
                        }
                    }
                }
            )

        },
        error: function (data, status) {  // Обработчик ответа в случае ошибки
            console.error(data, status);
        }
    });
}
messages();
// setInterval(messages, 4000);