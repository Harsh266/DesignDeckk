// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'https://designdeckk.onrender.com', // your backend URL
//   withCredentials: true, // IMPORTANT for cookies to work
// });

// export default axiosInstance;

// utils/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // or http://localhost:5000/api
  withCredentials: true, // allow sending cookies
  headers: {
    "Content-Type": "application/json", // ensure JSON format
  },
});

export default axiosInstance;
