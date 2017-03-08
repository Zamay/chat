/**
 * Created by zamaj on 03.03.2017.
 */
function getInternetExplorerVersion()
{
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}
function ready() {
    if(getInternetExplorerVersion()!==-1){

        var r = confirm("Смените браузер.С данным браузером сайт будет работать некорректно ");
        if (r == true) {
            window.close();
        }
    }
}


document.addEventListener("DOMContentLoaded", ready);
