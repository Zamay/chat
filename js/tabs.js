/**
 * Created by zamaj on 03.02.2017.
 */
$(function() {


    function oneTab() {
        $(".wrap-tab-content div").hide();
        $(".tabs li a").removeClass("active");
        $(".main_menu a").addClass("active");

        if ($(".main_menu a").hasClass("active")) {
            $(".wrap-tab-content #main_menu").show();
        }
    }
    oneTab();

    var countTabs;
    function createTab() {
        countTabs = parseInt($(".tabs li a").length)+1;

        $(".wrap-tab-content div").hide();
        $(".tabs li a").removeClass("active");

        var myLi = $('<li>', {
            class: 'tab' + countTabs
        }).appendTo('.tabs');

        var myA = $('<a>', {
            href: '#' + countTabs,
            text: 'New tab '
        }).appendTo('.tabs li:last').addClass("active");

        var myIcon = $('<i>', {
            class: 'ion-close-circled'
        }).appendTo('.tabs li a:last');

        var myDiv = $('<div>', {
            'id': countTabs,
            text: countTabs + ' lorem ipsum'
        }).appendTo('.wrap-tab-content');
    }


    $(document).on('click', '.user', function() {
        if ($(".tabs li a").length >= 7){
            alert('Close tabs! Limit 7');
        }
        else{
            createTab();
        }
    });


    var id_user = $('.user').attr('href').split(/\w/);
    console.log(id_user);

    $(document).on('click', '.tabs li a', function() {
        $(".wrap-tab-content div").hide();
        $(this.hash).show();
        $(".tabs li a").removeClass("active");
        $(this).addClass("active");

        return false;
    });


    $(document).on('click', '.ion-close-circled', function() {
        $(this).parent().parent().remove();
        var tabHref = $(this).parent().attr('href');
        $(tabHref).remove();
    });
});