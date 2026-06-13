import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://blog-api.vedantd.in/api",
  withCredentials: true, // Enable sending cookies with requests
});
