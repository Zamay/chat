/**
 * Created by zamaj on 03.02.2017.
 */
var urls = 'https://server-for-chat-mitya.c9users.io:8080';


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
            console.log(data)
            $(".user_login").html("Your name: " + data.username);
            if (data.id) userIdNow = data.id;
            if (data.user_id) userIdNow = data.user_id;
            console.log(userIdNow)
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


document.addEventListener('DOMContentLoaded', e => {
    document.querySelector('#editor').addEventListener('keydown', function(e){
        if('key' in e){
            if(e.key.toLowerCase() !== 'enter') // Если свойство KeyboardEvent.key не равно enter - выходим
                return;
        }else{
            if(e.keyCode !== 13) // Более грубое, но более поддерживаемое свойство, 13 - enter
                return;
        }

        // Иначе убираем поведение браузера и делаем свои делишки
        e.preventDefault();
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
    });
});


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

    // $(`<p><b>${userName}:</b> ${data.message} <span style="float: right">${time}</span></p>`).appendTo($('.main_menu'));
    $('#main_menu').append(`<p><b>${userName}:</b> ${data.message} <span style="float: right">${time}</span></p>`)

    // console.log($('.day_container').data('date') == `${dateMes}`)
    // if ($('.day_container').data('date') == `${dateMes}`) {
    //     $(`<p><b>${userName}:</b> ${data.message} <span style="float: right">${time}</span></p>`).appendTo($('.day_msgs'));
    // } else {
    //     $(`
    //         <div class="day_container" data-date="${dateMes}">
    //           <div class="day_divider" >
    //               <span>${dateMess}</span>
    //           </div>
    //           <div class="day_msgs">
    //             <p><b>${userName}:</b> ${data.message} <span style="float: right">${time}</span></p>
    //           </div>
    //         </div>`).appendTo(messages);
    // }
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
