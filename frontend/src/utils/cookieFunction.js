export function setCookie (token, maintain=undefined) {
    let date = new Date();
    let expires = '';
    if (maintain) {
        date.setDate(date.getDate() + 30);
        expires = date.toUTCString();
    };
    document.cookie=`token=${token};expires=${expires}`;
};

export function removeCookie () {
    let date = new Date();
    date.setDate(date.getDate() - 1);

    document.cookie=`token='';expires=${date.toUTCString()}`
}

export function getCookie() {
    return document.cookie ? document.cookie.split('=')[1] : "";
}