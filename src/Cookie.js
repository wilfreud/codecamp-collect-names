import Cookie from 'js-cookie'

function SetCookie(cookiename, usrin) {
    Cookie.set(cookiename, usrin, {
        expires : 10,
        secure : true,
        path : '/'
    })
}

function GetCookie(cookiename){
    return Cookie.get(cookiename)
}

export {SetCookie, GetCookie}