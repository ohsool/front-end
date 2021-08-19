import axios from "axios";
import crypto from "crypto";
import { gzip } from "zlib";
import { getCookie, setCookie } from "../../share/Cookie";

const secretAPIkey = () => {
    const time = new Date();
    let key = String(time.getDate()) + String(time.getHours()) + String(time.getUTCFullYear()) + String(time.getUTCHours());

    key = crypto.createHmac('sha256', key).digest('base64');
    key = key.replace(/[^a-zA-Z ]/g, "");

    return key;
};

const key = secretAPIkey();

export const axiosInstance = axios.create({
    baseURL: `https://오늘의술.shop`,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "accept": "application/json,",
        // 'Content-Encoding': 'gzip'
    }
});


axiosInstance.interceptors.request.use(
    function (config){
        const accessToken = getCookie("_osid");
        const refreshToken = getCookie("_osidRe");
        config.headers.common["access"] = `Bearer ${accessToken}`;
        config.headers.common["refresh"] = `Bearer ${refreshToken}`;
        config.headers.common["Secretkey"] = key;
        return config;
    }
);

axiosInstance.interceptors.request.use(
    (response) => {
        return response;
    }
)