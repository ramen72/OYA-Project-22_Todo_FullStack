import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // this for send cookie permission
  // timeout: 5000, // Why could not use "timeout" property?
});

// http://localhost:3000/api/auth/refresh
let accessToken = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).accessToken
  : null;
export const setToken = (token) => {
  accessToken = token;
};

// Registration
api.interceptors.request.use(async (config) => {
  console.log("this is before API Call.");
  console.log("AccessToken", accessToken);
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    if (decoded.exp * 1000 < Date.now()) {
      const res = await api.post("/auth/refresh");
      accessToken = res.data.accessToken;
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default api;
