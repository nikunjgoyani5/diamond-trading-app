import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

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
  otpVerified: boolean;
  loading: boolean;
  error: string | null;
}

/* ================= STATE ================= */

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  otpVerified: false,
  loading: false,
  error: null,
};

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* ---------- SIGNUP ---------- */
    signupRequest(state, _action: PayloadAction<SignupPayload>) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(
      state,
      action: PayloadAction<{ email: string; name: string }>,
    ) {
      state.loading = false;
      state.user = {
        id: "",
        name: action.payload.name,
        email: action.payload.email,
        role: "user",
      };
      state.isAuthenticated = true;
      state.otpVerified = false;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------- LOGIN ---------- */
    loginRequest(state, _action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        otpVerified?: boolean;
      }>,
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.otpVerified = action.payload.otpVerified ?? true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------- OTP ---------- */
    verifyOtpRequest(
      state,
      _action: PayloadAction<{ email: string; otp: string }>,
    ) {
      state.loading = true;
      state.error = null;
    },
    verifyOtpSuccess(
      state,
      action: PayloadAction<{ token?: string; user?: User }>,
    ) {
      state.loading = false;
      state.otpVerified = true;

      if (action.payload?.token) {
        state.token = action.payload.token;
      }
      if (action.payload?.user) {
        state.user = action.payload.user;
      }
    },
    verifyOtpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    resendOtpRequest(state, _action: PayloadAction<{ email: string }>) {
      state.loading = true;
    },

    resendOtpSuccess(state, _action: PayloadAction<{ message?: string }>) {
      state.loading = false;
    },

    resendOtpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------- FORGOT PASSWORD ---------- */
    forgotPasswordRequest(state, _action: PayloadAction<{ email: string }>) {
      state.loading = true;
    },
    forgotPasswordSuccess(state) {
      state.loading = false;
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------- LOGOUT ---------- */
    logout() {
      return initialState;
    },

    resetAuthError(state) {
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
