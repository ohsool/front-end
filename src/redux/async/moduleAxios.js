import axios from "axios";

const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
};

export const headerAxios = axios.create({
    baseURL: `url`,
    headers: headers,
});

export const nonHeaderAxios = axios.create({
    baseURL: `http://13.125.162.255`,
});