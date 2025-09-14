import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  //   baseURL: "http://localhost3000/api",
  baseURL: "https://jsonplaceholder.typicode.com",
  withCredentials: true, // this for send cookie permission
});

let accessToken = null;
export const setToken = (token) => {
  accessToken = token;
};

api.interceptors.request.use(async (config) => {
  console.log("this is before API Call.");
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
