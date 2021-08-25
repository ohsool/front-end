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
            originalRequest._retry = true;
            const dhtnf = originalRequest.headers.dhtnf.split(" ")[1];
            const chlrh = originalRequest.headers.chlrh.split(" ")[1];
            const dlfwh = originalRequest.headers.dlfwh.split(" ")[1];
            const ghkxld = originalRequest.headers.ghkxld.split(" ")[1];
            if(error.response.data.dlfwh){ //get new refresh
                setCookie("_dhtnf", dhtnf); //access
                setCookie("_chlrh", chlrh); //access
                setCookieRefresh("_dlfwh", error.response.data.dlfwh); //refresh
                setCookieRefresh("_ghkxld", error.response.data.ghkxld); //refresh
                originalRequest.headers.dhtnf = `${originalRequest.headers.dhtnf}`; // access
                originalRequest.headers.chlrh = `${originalRequest.headers.chlrh}`; // access
                originalRequest.headers.ghkxld = `Bearer ${error.response.data.ghkxld}`; //refresh
                originalRequest.headers.dlfwh = `Bearer ${error.response.data.dlfwh}`; //refresh
            }
            else{  //get new access
                setCookie("_dhtnf", error.response.data.dhtnf);  //access
                setCookie("_chlrh", error.response.data.chlrh);  //access
                setCookieRefresh("_dlfwh", dlfwh);
                setCookieRefresh("_ghkxld", ghkxld);
                originalRequest.headers.ghkxld = `${originalRequest.headers.ghkxld}`; //refresh
                originalRequest.headers.dlfwh = `${originalRequest.headers.dlfwh}`; //refresh
                originalRequest.headers.dhtnf = `Bearer ${error.response.data.dhtnf}`; // access
                originalRequest.headers.chlrh = `Bearer ${error.response.data.chlrh}`; // access
            }
        return axiosInstance(originalRequest);
        }
    return Promise.reject(error);
});