import api from "@/lib/api";
import { ENDPOINTS } from "./endpoints";

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post(ENDPOINTS.AUTH.REGISTER, data);

export const verifyEmail = (data: {
  email: string;
  otp: string;
}) => api.post(ENDPOINTS.AUTH.VERIFY_EMAIL, data);

export const resendOtp = (email: string) =>
  api.post(ENDPOINTS.AUTH.RESEND_OTP, { email });

export const loginUser = (data: {
  email: string;
  password: string;
}) => api.post(ENDPOINTS.AUTH.LOGIN, data);
