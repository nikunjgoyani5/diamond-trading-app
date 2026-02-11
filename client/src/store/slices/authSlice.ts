import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signupSuccess: boolean;
  otpVerified: boolean;
  forgotPasswordSuccess: boolean;
  resetPasswordSuccess: boolean;
  loading: boolean;
  error: string | null;
  pendingVerificationEmail: string | null;
  pendingResetOtp: string | null; // Store OTP for reset password flow
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  signupSuccess: false,
  otpVerified: false,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
  loading: false,
  error: null,
  pendingVerificationEmail: null,
  pendingResetOtp: null,
};

/* -------- SLICE -------- */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* -------- SIGNUP -------- */

    signupRequest(state, _action: PayloadAction<SignupPayload>) {
      state.loading = true;
      state.error = null;
      state.signupSuccess = false;
      state.pendingVerificationEmail = null;

    },

    signupSuccess(state, action: PayloadAction<{ email: string; name: string }>) {
      state.loading = false;
      state.signupSuccess = true;
      state.pendingVerificationEmail = action.payload.email;

      state.user = {
        id: "",
        name: action.payload.name,
        email: action.payload.email,
        role: "user",
      };

      state.isAuthenticated = false;
      state.otpVerified = false;
      state.token = null;
    },

    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.signupSuccess = false;
    },

    /* -------- OTP VERIFY -------- */

    verifyOtpRequest(
      state,
      _action: PayloadAction<{
        email: string;
        otp: string;
        mode: "VERIFY_EMAIL" | "FORGOT_PASSWORD";
      }>
    ) {
      state.loading = true;
      state.error = null;
    },

    verifyOtpSuccess(
      state,
      action: PayloadAction<{
        mode: "VERIFY_EMAIL" | "FORGOT_PASSWORD";
        otp?: string;
      }>
    ) {
      state.loading = false;
      state.otpVerified = true;
      
      // Store OTP for forgot password flow (needed for reset password API call)
      if (action.payload.mode === "FORGOT_PASSWORD" && action.payload.otp) {
        state.pendingResetOtp = action.payload.otp;
      }
    },

    verifyOtpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.otpVerified = false;
    },

    /* -------- RESEND-OTP -------- */

    resendOtpRequest(state, _action: PayloadAction<{ email: string }>) {
      state.loading = true;
      state.error = null;
    },

    resendOtpSuccess(state) {
      state.loading = false;
    },

    resendOtpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    resetOtpState(state) {
      state.otpVerified = false;
    },

    /* -------- LOGIN -------- */

    loginRequest(state, _action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    /* -------- FORGOT PASSWORD -------- */

    forgotPasswordRequest(state, _action: PayloadAction<{ email: string }>) {
      state.loading = true;
      state.error = null;
      state.forgotPasswordSuccess = false;
    },

    forgotPasswordSuccess(state, action: PayloadAction<{ email: string }>) {
      state.loading = false;
      state.forgotPasswordSuccess = true;
      state.pendingVerificationEmail = action.payload.email;
    },

    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.forgotPasswordSuccess = false;
    },

    resetForgotPasswordState(state) {
      state.forgotPasswordSuccess = false;
    },

    resetPasswordRequest(
  state,
  _action: PayloadAction<{
    email: string;
    otp: string;
    newPassword: string;
  }>
) {
  state.loading = true;
  state.error = null;
  state.resetPasswordSuccess = false;
},

    resetPasswordSuccess(state) {
      state.loading = false;
      state.resetPasswordSuccess = true;
      // Clear pending data after successful reset
      state.pendingVerificationEmail = null;
      state.pendingResetOtp = null;
      state.otpVerified = false;
    },

resetPasswordFailure(state, action: PayloadAction<string>) {
  state.loading = false;
  state.error = action.payload;
  state.resetPasswordSuccess = false;
},


    /* -------- LOGOUT -------- */

    logout() {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      delete api.defaults.headers.common.Authorization;
      return initialState;
    },

    /* -------- COMMON -------- */

    resetAuthError(state) {
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
