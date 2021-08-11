import axios from "axios";
import crypto from "crypto";

const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
};

const secretAPIkey = () => {
    const time = new Date();
    let key = String(time.getDate()) + String(time.getHours()) + String(time.getUTCFullYear()) + String(time.getUTCHours());

    key = crypto.createHmac('sha256', key).digest('base64');
    key = key.replace(/[^a-zA-Z ]/g, "")

    return key;
};

const key = secretAPIkey();

export const headerAxios = axios.create({
    baseURL: `https://오늘의술.shop/${key}`,
    headers: headers,
});

export const nonHeaderAxios = axios.create({
    baseURL: `https://오늘의술.shop/${key}`,
});