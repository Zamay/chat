/**
 * Created by zamaj on 03.02.2017.
 */
var urls = 'https://main-workspace-juggerr.c9users.io:8081';


$(function () {

    $(".wrap-tab-content div").hide();
    $(".tabs li a").removeClass("active");
    $(".main_menu a").addClass("active");

    if ($(".main_menu a").hasClass("active")) {
        $(".wrap-tab-content #main_menu").show();
    }

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
                    class: 'tab' + (countTabs - 1)
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
var userId;
var username = document.querySelector("input[name=username]");
function logine() {
    $.ajax({
        url: urls + '/user/register',
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
            userId = data.id;
        },
        error: function (data, status) {
            if (data.username == username.value) {
                alert("ttrue");
                $(".__login").html(data.username);
            }
            console.log(data, status);
        }

    });

    function delBlockUser() {
        $(".body_login").remove();
    }

    setTimeout(delBlockUser, 1000);

    return false;
};

//Получение пользователей
var usersData;
var userAll = {};
function users() {
    $.ajax({
        type: 'GET',
        url: urls + '/user',
        success: function (data) {  // Обработчик успешного ответа

            data.forEach(
                function (obj) {
                    usersData = data;
                    console.log("user" + obj);
                    if (obj.username != "" || obj.user_id != "") {
                        var users = document.querySelector('.list_user');
                        var userId = obj.user_id;
                        if (!userAll[userId]) {
                            userAll[userId] = true;
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
users();
setInterval(users, 10000);

// Получения сообщения
var messagesData;
//var messagesAll = {};
function messages() {
    $.ajax({
        type: 'GET',
        url: urls + '/messages',
        success: function (data) {  // Обработчик успещного ответа

            data.forEach(
                function (obj) {
                    messagesData = obj.user_id;
                    resMess(obj);
                }
            )
        },
        error: function (data, status) {  // Обработчик ответа в случае ошибки
            console.error(data, status);
        }
    });
}
messages();
//setTimeout(messages, 4000);
//setInterval(messages, 3000);

// отправка сообщений
//var text_message = $('#editor').html(); //откуда брать текст - ....

function message() {
    $.ajax({
        url: urls + '/messages',
        type: "POST",
        data: JSON.stringify(
            {
                "user_id": username.value,
                "message": $('#editor').html(),
                "datetime": new Date()
            }
        ),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            resMess(data);

            $('#editor').html('');

            console.log(data);
        },
        error: function (data, status) {
            console.log(data, status);
        }


    });
}

function resMess(data) {
    var userName = resUserMes(usersData, messagesData);
    var messages = document.querySelector('.wrap-tab-content');
    var newDiv = document.createElement('div');
    var dateStr = data.datetime;

    var time = moment(dateStr).format('H:mm:ss');
//  var dateMes = moment(dateStr).format('DD.MM.YYYY');
    newDiv.id = data.user_id;
    newDiv.innerHTML = `<p><b>${userName}:</b> ${data.message} <span style="float: right">${time}</span></p>`;
    messages.appendChild(newDiv);
}


function resUserMes(users, mesUserId) {

    var userName;
    var mesId = mesUserId;

    users.forEach(
        function (user) {
            if (user.user_id == mesId) userName = user.username;
        }
    )
    return userName;
}

