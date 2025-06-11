// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'https://designdeckk.onrender.com', // your backend URL
//   withCredentials: true, // IMPORTANT for cookies to work
// });

// export default axiosInstance;

// utils/axios.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://designdeckk.onrender.com", // or http://localhost:5000/api
    withCredentials: true, // allow sending cookies
    headers: {
        "Content-Type": "application/json", // ensure JSON format
    },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axiosInstance.post('/auth/refresh-token');
                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                window.location.href = '/signin';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
