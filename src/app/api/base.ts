import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const devEnv = import.meta.env.NODE_ENV !== 'production';
const { VITE_PUBLIC_SERVER_URL, VITE_PUBLIC_API_URL } = import.meta.env;

const HTTPS = axios.create({
    baseURL: `${devEnv ? VITE_PUBLIC_SERVER_URL : VITE_PUBLIC_API_URL}`,
});

HTTPS.interceptors.request.use(
    (req: AxiosRequestConfig) => {
        const token = localStorage.token;

        if (token) {
            req.headers['Authorization'] = `Bearer ${token}`;
        }
        return req;
    },
    function error() {
        return Promise.reject(error);
    },
);

HTTPS.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error: string) => {
        throw error;
    },
);

export default HTTPS;
