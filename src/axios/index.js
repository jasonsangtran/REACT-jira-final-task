import axios from "axios";

export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxOSIsIkhldEhhblN0cmluZyI6IjI1LzExLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2OTMzNDQwMDAwMCIsIm5iZiI6MTYzNzk0NjAwMCwiZXhwIjoxNjY5NDgyMDAwfQ.TumAQWyBApm0qV2BOdFeXHmfMi9OQfvjTTG-Vs-cxf4';

export const USER_LOGIN = 'userLogin';
export const ACCESSTOKEN = 'accessToken';

const userData = JSON.parse(localStorage.getItem(ACCESSTOKEN)) || {};

// interceptor
export const http = axios.create({
    baseURL: 'https://jiranew.cybersoft.edu.vn/api',
    timeout: 20000,
});

http.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers,
            Authorization: 'Bearer' + JSON.parse(localStorage.getItem(ACCESSTOKEN))?.accessToken,
            TokenCybersoft: TOKEN_CYBERSOFT,
            'Content-type': 'application/json',
        };
        return config;
    },
    (errors) => {return Promise.reject({errors})}
);