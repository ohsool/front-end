import axios from "axios";
import crypto from "crypto";
import { getCookie } from "../../share/Cookie";

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
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json,",
    }
});

// export const nonHeaderAxios = axios.create({
//     baseURL: `https://오늘의술.shop/${key}`,
// });

axiosInstance.interceptors.request.use(
    // (response) => {
    //     return response;
    // }
    function (config){
        const accessToken = getCookie("_osid");
        config.headers.common["Authorization"] = `Bearer ${accessToken}`;
        config.headers.common["Secretkey"] = key;
        return config
    }
);