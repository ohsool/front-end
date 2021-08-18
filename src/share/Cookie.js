import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value) => {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);
    return cookies.set(name, value, {
        path: "/",
        expires,
        secure: true,
        // httpOnly: true,
    })
};
export const setCookieRefresh = (name, value) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 14);
    return cookies.set(name, value, {
        path: "/",
        expires,
        secure: true,
        // httpOnly: true,
    })
};

export const getCookie = (name) => {
    return cookies.get(name);
};

export const removeCookie = (name) => {
    return cookies.remove(name);
};