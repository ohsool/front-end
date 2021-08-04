import axios from "axios";

const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
};

export const headerAxios = axios.create({
    baseURL: `https://오늘의술.shop`,
    headers: headers,
});

export const nonHeaderAxios = axios.create({
    baseURL: `https://오늘의술.shop`,
});