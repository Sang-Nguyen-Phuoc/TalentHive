import axios from "axios";
import { getAccessToken } from "./authToken";

const axiosCustom = axios.create({
    baseURL: "http://localhost:3002",
});

// Add a request interceptor
axiosCustom.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // console.log("Authorization:---> ", config.headers.Authorization);
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosCustom.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data?.data || response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const { response } = error;
        const message = response?.data?.message || "Something went wrong";
        if (response?.status >= 400 && response?.status < 500) {
            return Promise.reject({
                type: "fail",
                status: response?.status,
                message,
                data: response?.data?.data || null,
            });
        } else if (response?.status >= 500) {
            return Promise.reject({
                type: "error",
                status: response?.status,
                message,
            });
        }

        // not defined error (e.g. network error)
        return Promise.reject({
            type: "http",
            message: error.message,
            response: error.response,
        });
    }
);

export default axiosCustom;
