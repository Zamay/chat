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

        var usersOnline = $(".show_list>ul>li").length;
        $(".online")['0'].innerHTML = ("Online: " + usersOnline );

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


            var marks  = $(this).val().split(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/).length-1;
            $('.info>ul>li')[3].innerHTML = (marks  + ' punttuation marks entered');

        });
    })();

};