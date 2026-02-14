import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";

/* ---------------- TYPES ---------------- */

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthFlowState {
  type: "NONE" | "SIGNUP" | "VERIFY_EMAIL" | "FORGOT_PASSWORD" | "RESET_PASSWORD";
  status: "IDLE" | "LOADING" | "SUCCESS" | "FAILURE";
  email?: string;
  otp?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  loading: boolean;
  error: string | null;

  flow: AuthFlowState;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  flow: {
    type: "NONE",
    status: "IDLE",
  },
};

/* ---------------- SLICE ---------------- */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* -------- REQUEST TRIGGERS (FOR SAGA) -------- */

    signupRequest(
      _state,
      _action: PayloadAction<{ name: string; email: string; password: string }>
    ) {},

    verifyOtpRequest(
      _state,
      _action: PayloadAction<{
        email: string;
        otp: string;
        mode: "VERIFY_EMAIL" | "FORGOT_PASSWORD";
      }>
    ) {},

    forgotPasswordRequest(
      _state,
      _action: PayloadAction<{ email: string }>
    ) {},

    resetPasswordRequest(
      _state,
      _action: PayloadAction<{ email: string; otp: string; newPassword: string }>
    ) {},

    resendOtpRequest(
      _state,
      _action: PayloadAction<{ email: string }>
    ) {},

    /* -------- FLOW MANAGEMENT -------- */

    startFlow(state, action: PayloadAction<AuthFlowState["type"]>) {
      state.flow = {
        type: action.payload,
        status: "LOADING",
      };
      state.error = null;
    },

    flowSuccess(
      state,
      action: PayloadAction<{ email?: string; otp?: string }>
    ) {
      state.flow.status = "SUCCESS";
      state.flow.email = action.payload.email;
      state.flow.otp = action.payload.otp;
    },

    flowFailure(state, action: PayloadAction<string>) {
      state.flow.status = "FAILURE";
      state.error = action.payload;
    },

    resetFlow(state) {
      state.flow = {
        type: "NONE",
        status: "IDLE",
      };
      state.error = null;
    },

    /* -------- LOGIN -------- */

    loginRequest(
      state,
      _action: PayloadAction<{
        email: string;
        password: string;
        rememberMe?: boolean;
      }>
    ) {
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
    },

    /* -------- LOGOUT -------- */

    logout() {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      delete api.defaults.headers.common.Authorization;
      return initialState;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
