import axios from "axios";
import crypto from "crypto";
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

axiosInstance.interceptors.request.use(
    (response) => {
        return response;
    }, async function (error) {
        const originalRequest = error.config;
        if(error.response.status === 418 && !originalRequest._retry){
            originalRequest._retry = true;
            const response = await axios.get('/api/user/me')
            if(response.data.dhtnf){
                setCookie("_dhtnf", response.data.dhtnf);
                setCookie("_chlrh", response.data.chlrh);
            }
            else if(response.data.dlfwh){
              setCookie("_dlfwh", response.data.dlfwh);
              setCookie("_ghkxld", response.data.ghkxld);
            }
            return axios(originalRequest);
        }
        return Promise.reject(error);
    });