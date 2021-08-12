import axios from "axios";
import crypto from "crypto";
import { getCookie } from "../../share/Cookie";

const token = sessionStorage.getItem("token");

const headers = {
    Authorization: `Bearer ${token}`,
};

const secretAPIkey = () => {
    const time = new Date();
    let key = String(time.getDate()) + String(time.getHours()) + String(time.getUTCFullYear()) + String(time.getUTCHours());

    key = crypto.createHmac('sha256', key).digest('base64');
    key = key.replace(/[^a-zA-Z ]/g, "");

    return key;
};

const key = secretAPIkey();

export const headerAxios = axios.create({
    baseURL: `https://오늘의술.shop/${key}`,
});

export const nonHeaderAxios = axios.create({
    baseURL: `https://오늘의술.shop/${key}`,
});

headerAxios.interceptors.request.use(
    function (config){
        const token = getCookie("_osid");

        config.headers.common["Authorization"] = `Bearer ${token}`;
        
        return config
    }
);