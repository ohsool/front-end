import axios from "axios";
import crypto from "crypto";
import { getCookie, setCookie, setCookieRefresh } from "../../share/Cookie";
import { userInfo } from "./user";

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
        const dhtnf = getCookie("_dhtnf");
        const chlrh = getCookie("_chlrh");
        const dlfwh = getCookie("_dlfwh");
        const ghkxld = getCookie("_ghkxld");
        config.headers.common["ghkxld"] = `Bearer ${ghkxld}`;
        config.headers.common["dhtnf"] = `Bearer ${dhtnf}`;
        config.headers.common["chlrh"] = `Bearer ${chlrh}`;
        config.headers.common["dlfwh"] = `Bearer ${dlfwh}`;
        config.headers.common["Secretkey"] = key;
        return config;
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }, async function (error) {
        const originalRequest = error.config;
        if(error.response.status === 418 && !originalRequest._retry){
            // const result = await axiosInstance.get(`/api/user/me`)
            originalRequest._retry = true;
            if(error.response.data.dlfwh){
                setCookie("_dlfwh", originalRequest.headers.dlfwh);
                setCookie("_ghkxld", originalRequest.headers.ghkxld);
                setCookieRefresh("_dhtnf", error.response.data.dlfwh);
                setCookieRefresh("_chlrh", error.response.data.ghkxld);
                originalRequest.headers.ghkxld = `Bearer ${error.response.data.ghkxld}`;
                originalRequest.headers.dlfwh = `Bearer ${error.response.data.dlfwh}`;
            }
            else{
                setCookie("_dlfwh", error.response.data.dhtnf);
                setCookie("_ghkxld", error.response.data.chlrh);
                setCookieRefresh("_dhtnf", error.response.data.dhtnf);
                setCookieRefresh("_chlrh", error.response.data.chlrh);
                originalRequest.headers.dhtnf = `Bearer ${error.response.data.dhtnf}`;
                originalRequest.headers.chlrh = `Bearer ${error.response.data.chlrh}`;
            }
        return axiosInstance(originalRequest);
        }
    return Promise.reject(error);
});