import api from "../../api";

export const registration = (data) => api.post("/auth/registration", data);
export const verifyEmail = (data) => api.post(`/auth/verify/${token}`, data);
export const login = (data) => api.post("/auth/login", data);
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);
export const resetPassword = (data) =>
  api.post(`/auth/reset-password/${token}`, data);
