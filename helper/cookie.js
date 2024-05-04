export function setCookie(name, value, daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;

    document.cookie = cookieString;
}

export function getCookie(name) {
    if (typeof document !== 'undefined') {
        // code that relies on the document object 
        const cookies = document?.cookie?.split("; ");
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split("=");
            if (cookieName === name) {
                return cookieValue;
            }
        }

    }
    return null;
}

export function deleteCookie() {
    document.cookie = 'auth_token=; Max-Age=-99999999;';
}