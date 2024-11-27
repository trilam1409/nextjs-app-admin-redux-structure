import axios from "axios";
import { ACCESS_TOKEN } from "@/constants/browser-storage-names";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN, // Replace with your API base URL
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.message?.includes("timeout")) {
      return Promise.reject();
    }

    const response = error?.response;
    switch (response?.status) {
      // case 401:
      //   window.location.replace(LOGOUT_ROUTE);
      //   break;
      case 500:
        return Promise.reject();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
