import axios from "axios";

const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

export const headerAxios = axios.create({
    baseURL: `url`,
    headers: headers,
});

export const nonHeaderAxios = axios.create({
    baseURL: `url`,
});