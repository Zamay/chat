/**
 * Created by zamaj on 03.02.2017.
 */
var urls = 'https://main-workspace-juggerr.c9users.io:8081';

//login
let userIdNow;
const username = document.querySelector("input[name=username]");
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
            userIdNow = data.id;
        },
        error: function (data, status) {
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
        success: function (data) {
            data.forEach(
                function (obj) {
                    usersData = data;
                    console.log("user" + obj);
                    if (obj.username != "" || obj.user_id != "") {
                        var userId = obj.user_id;
                        if (!userAll[userId]) {
                            userAll[userId] = true;
                            var ul = document.querySelector(".list_user");
                            ul.lastElementChild.innerHTML += `<li id="${obj.user_id}">
                                                              <a href = #${obj.user_id} class="user">${obj.username} </a></li>`;
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

var messagesData;
var mesAll = {};
function messages() {
    $.ajax({
        type: 'GET',
        url: urls + '/messages',
        success: function (data) {
            data.forEach(
                function (obj) {
                    messagesData = obj.user_id;
                    var key = obj.user_id + "/" + obj.datetime;
                    if (!mesAll[key]) {
                        mesAll[key] = obj;
                        respMess(obj);
                    }
                }
            )
        },
        error: function (data, status) {
            console.error(data, status);
        }
    });
}
messages()
setInterval(messages, 3000);

// отправка сообщений
$('button[name="sendMess"]').click(function(){
    $.ajax({
        url: urls + '/messages',
        type: "POST",
        data: JSON.stringify(
            {
                "user_id": String(userIdNow),
                "message": $('#editor').html(),
                "datetime": new Date()
            }
        ),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#editor').html('');
            console.log(data);
        },
        error: function (data, status) {
            console.log(data, status);
        }
    });
})

function respMess(data) {
    let userName = resUserMes(usersData, messagesData);
    let messages = document.querySelector('#main_menu');

    let dateStr = data.datetime;
    let time = moment(dateStr).format('H:mm:ss');
    let dateMes = moment(dateStr).format('DD.MM.YYYY');

    let dateMess  = moment(dateStr).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastDay: '[Yesterday]',
        sameElse: 'MMMM Do'
    })

    console.log($('.day_container').data('date') == `${dateMes}`)
    if ($('.day_container').data('date') == `${dateMes}`) {
        $(`<p><b>${userName}:</b> ${data.message} <span style="float: right">${time}</span></p>`).appendTo($('.day_msgs'));
    } else {
        $(`
            <div class="day_container" data-date="${dateMes}">
              <div class="day_divider" >
                  <span>${dateMess}</span>
              </div>
              <div class="day_msgs">
                <p><b>${userName}:</b> ${data.message} <span style="float: right">${time}</span></p>
              </div>
            </div>`).appendTo(messages);
    }
    $(".main_cont").scrollTop(2000);
}


function resUserMes(users, mesUserId) {

    var userName;
    var mesId = mesUserId;

    users.forEach(function (user) {
            if (user.user_id == mesId) userName = user.username;
        }
    )

    return userName;
}


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
                    class: 'tab'
                }).appendTo('.tabs');

                $('<a>', {
                    href: this.hash.replace('', ''),
                    text: 'UserMane'// Значение нажатой вкладки слева --- this
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
        $(".wrap-tab-content").children().hide();
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

        //....
        return false;
    });
});