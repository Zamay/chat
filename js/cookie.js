/**
 * Created by zamay on 10.02.17.
 */


    function set_cookie ( name, value, expires_year, expires_month, expires_day, path, domain, secure )
    {
        var cookie_string = name + "=" + escape ( value );

        if ( expires_year )
        {
            var expires = new Date ( expires_year, expires_month, expires_day );
            cookie_string += "; expires=" + expires.toGMTString();
        }

        if ( path )
            cookie_string += "; path=" + escape ( path );

        if ( domain )
            cookie_string += "; domain=" + escape ( domain );

        if ( secure )
            cookie_string += "; secure";

        document.cookie = cookie_string;

    }

function delete_cookie ( cookie_name )
{
    var cookie_date = new Date ( );
    cookie_date.setTime ( cookie_date.getTime() - 1 );
    document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function get_cookie ( cookie_name )
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}

if ( ! get_cookie ( "username" ) )
{
    var username = prompt ( "Пожалуйста, ведите Ваше имя", "" );

    if ( username )
    {
        var current_date = new Date;
        var cookie_year = current_date.getFullYear ( );
        var cookie_month = current_date.getMonth ( );
        var cookie_day = current_date.getDate ( ) + 1;
        set_cookie ( "username", username, cookie_year, cookie_month, cookie_day );
        document.location.reload( );
    }
}
else
{
    var username = get_cookie ( "username" );
    $('.__login')[0].innerHTML = username;
}