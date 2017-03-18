/**
 * Created by zamaj on 03.02.2017.
 */

window.onload = function () {

    //пользователей онлайн
    (function () {
        var usersOnline = $(".list_user>ul>li").length;
        $(".all_user").html("All Users: " + usersOnline );
        setTimeout(arguments.callee, 1);
    })();

    // Добавлять класс "form_active" для кнопок
    $(document).on('click', '.btn ', function () {
        $(this).toggleClass("form_active");

    });

    //Добавлять кнопкам атрр b i u
    $('.toolbar button[data-func]').click(function () {
        document.execCommand($(this).data('func'), false);
    });

};

//колво символов

function text_button() {
    $('#editor').keyup(function () {

        var count = $(this).text().length;
        $('.info>ul>li')[0].innerHTML = (count + ' characters entered');


        var words = $(this).text().split(/[\S\.\?]+/).length - 1;
        $('.info>ul>li')[1].innerHTML = (words + ' letters entered');

        var whitespaces = $(this).text().split(/\s/).length - 1;
        $('.info>ul>li')[2].innerHTML = (whitespaces + ' whitespace characters entered');


        var marks = $(this).text().split(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/).length - 1;
        $('.info>ul>li')[3].innerHTML = (marks + ' punttuation marks entered');

        return false;
    });
};

var date = new Date();
function user_time() {
    $('.online_for').html("You are online for : " + moment(date).toNow(true));
    $('.local_time p').html("Your local time is : " + moment().format('H:mm:ss'));
}
setInterval(user_time, 1000);

