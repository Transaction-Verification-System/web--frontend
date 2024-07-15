import Localstore from "@/config/localstore";
import axios from "axios";
import displayError from "./displayError";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Localstore.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    displayError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
