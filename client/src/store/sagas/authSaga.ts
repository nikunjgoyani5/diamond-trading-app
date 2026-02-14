import { takeLatest, call, put } from "redux-saga/effects";
import { type PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { ENDPOINTS } from "@/services/endpoints";
import { authActions } from "../slices/authSlice";

/* ================= TOKEN HELPER ================= */

function setAuthToken(token?: string, rememberMe?: boolean) {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");

  if (token) {
    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

/* ================= SIGNUP ================= */

function* signupWorker(
  action: PayloadAction<{ name: string; email: string; password: string }>,
): Generator {
  try {
    yield put(authActions.startFlow("SIGNUP"));

    yield call(api.post, ENDPOINTS.AUTH.REGISTER, action.payload);

    yield put(
      authActions.flowSuccess({
        email: action.payload.email,
      }),
    );
  } catch (err: any) {
    yield put(
      authActions.flowFailure(
        err.response?.data?.message || "Signup failed",
      ),
    );
  }
}

/* ================= LOGIN ================= */

function* loginWorker(
  action: PayloadAction<{
    email: string;
    password: string;
    rememberMe?: boolean;
  }>
): Generator {
  try {
    const res: any = yield call(api.post, ENDPOINTS.AUTH.LOGIN, {
      email: action.payload.email,
      password: action.payload.password,
    });

    const { token, user: serverUser } = res.data.data;

    const user = {
      id: serverUser._id,
      name: serverUser.name,
      email: serverUser.email,
      role: serverUser.role,
    };

    setAuthToken(token, action.payload.rememberMe);

    yield put(
      authActions.loginSuccess({
        user,
        token,
      })
    );
  } catch (err: any) {
    setAuthToken(undefined);

    const status = err.response?.status;
    const response = err.response?.data;

    if (
      status === 403 &&
      response?.message?.toLowerCase().includes("email not verified")
    ) {
      yield put(authActions.startFlow("VERIFY_EMAIL"));
      yield put(
        authActions.flowFailure("Email not verified. Please verify OTP.")
      );
      return;
    }

    yield put(
      authActions.loginFailure(
        response?.message || "Login failed"
      )
    );
  }
}


/* ================= VERIFY OTP ================= */

function* verifyOtpWorker(
  action: PayloadAction<{
    email: string;
    otp: string;
    mode: "VERIFY_EMAIL" | "FORGOT_PASSWORD";
  }>,
): Generator {
  try {
    const { email, otp, mode } = action.payload;

    if (mode === "VERIFY_EMAIL") {
      yield put(authActions.startFlow("VERIFY_EMAIL"));

      yield call(api.post, ENDPOINTS.AUTH.VERIFY_EMAIL, {
        email,
        otp,
      });

      yield put(authActions.flowSuccess({ email }));
    }

    if (mode === "FORGOT_PASSWORD") {
      yield put(authActions.startFlow("RESET_PASSWORD"));

      // Do not call API yet (handled on actual reset)
      yield put(authActions.flowSuccess({ email, otp }));
    }
  } catch (err: any) {
    yield put(
      authActions.flowFailure(
        err.response?.data?.message || "OTP verification failed",
      ),
    );
  }
}

/* ================= FORGOT PASSWORD ================= */


function* forgotPasswordWorker(action: ReturnType<typeof authActions.forgotPasswordRequest>) {
  try {
    // 1️⃣ Start flow
    yield put(authActions.startFlow("FORGOT_PASSWORD"));

    // 2️⃣ Call API
    yield call(api.post, "/auth/forgot-password", {
      email: action.payload.email,
    });

    // 3️⃣ Success
    yield put(
      authActions.flowSuccess({
        email: action.payload.email,
      })
    );

  } catch (error: any) {
    yield put(
      authActions.flowFailure(
        error.response?.data?.message || "Failed to send OTP"
      )
    );
  }
}


/* ================= RESET PASSWORD ================= */

function* resetPasswordWorker(
  action: PayloadAction<{
    email: string;
    otp: string;
    newPassword: string;
  }>
): Generator {
  try {
    yield put(authActions.startFlow("RESET_PASSWORD"));

    yield call(api.post, ENDPOINTS.AUTH.RESET_PASSWORD, {
      email: action.payload.email,
      otp: action.payload.otp,
      newPassword: action.payload.newPassword,
    });

    yield put(authActions.flowSuccess({}));

  } catch (err: any) {
    yield put(
      authActions.flowFailure(
        err.response?.data?.message || "Password reset failed"
      )
    );
  }
}


/* ================= RESEND OTP ================= */

function* resendOtpWorker(
  action: PayloadAction<{ email: string }>,
): Generator {
  try {
    yield call(api.post, ENDPOINTS.AUTH.RESEND_OTP, action.payload);
  } catch (err: any) {
    yield put(
      authActions.flowFailure(
        err.response?.data?.message || "Failed to resend OTP",
      ),
    );
  }
}

/* ================= WATCHERS ================= */

export default function* authSaga(): Generator {
  yield takeLatest(authActions.signupRequest.type, signupWorker);
  yield takeLatest(authActions.loginRequest.type, loginWorker);
  yield takeLatest(authActions.verifyOtpRequest.type, verifyOtpWorker);
  yield takeLatest(authActions.resendOtpRequest.type, resendOtpWorker);
  yield takeLatest(authActions.forgotPasswordRequest.type, forgotPasswordWorker);
  yield takeLatest(authActions.resetPasswordRequest.type, resetPasswordWorker);
}
