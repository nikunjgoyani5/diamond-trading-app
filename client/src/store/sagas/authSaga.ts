import { takeLatest, call, put } from "redux-saga/effects";
import { type PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { ENDPOINTS } from "@/services/endpoints";
import { authActions } from "../slices/authSlice";

/* ================= HELPERS ================= */

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

/* ================= REGISTER ================= */
function* signupWorker(
  action: PayloadAction<{ name: string; email: string; password: string }>
): Generator {
  try {
    yield call(api.post, ENDPOINTS.AUTH.REGISTER, action.payload);

    // user created but NOT verified yet
    yield put(
      authActions.signupSuccess({
        email: action.payload.email,
        name: action.payload.name,
      })
    );
  } catch (err: any) {
    yield put(
      authActions.signupFailure(
        err.response?.data?.message || "Signup failed"
      )
    );
  }
}

/* ================= LOGIN ================= */
function* loginWorker(
  action: PayloadAction<{ email: string; password: string; rememberMe?: boolean }>
): Generator {
  try {
    const res: any = yield call(api.post, ENDPOINTS.AUTH.LOGIN, {
      email: action.payload.email,
      password: action.payload.password,
    });

    /**
     * Expected response:
     * {
     *   success: true,
     *   data: { token, user, otpVerified }
     * }
     */
    const { token, user: serverUser, otpVerified } = res.data.data;

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
        otpVerified,
      })
    );
  } catch (err: any) {
    setAuthToken(undefined);

    /**
     * Email exists but not verified → OTP flow
     */
    if (err.response?.data?.data?.isEmailVerified === false) {
      yield put(
        authActions.signupSuccess({
          email: action.payload.email,
          name: "",
        })
      );

      yield put(
        authActions.loginFailure(
          "Email not verified. Please verify your email."
        )
      );
      return;
    }

    yield put(
      authActions.loginFailure(
        err.response?.data?.message || "Login failed"
      )
    );
  }
}

/* ================= VERIFY OTP ================= */
function* verifyOtpWorker(
  action: PayloadAction<{ email: string; otp: string }>
): Generator {
  try {
    const res: any = yield call(
      api.post,
      ENDPOINTS.AUTH.VERIFY_EMAIL,
      action.payload
    );

    /**
     * Best practice:
     * backend should return fresh token + user after OTP
     */
    const { token, user: serverUser } = res.data.data;

    const user = serverUser
      ? {
          id: serverUser._id,
          name: serverUser.name,
          email: serverUser.email,
          role: serverUser.role,
        }
      : undefined;

    setAuthToken(token, true);

    yield put(
      authActions.verifyOtpSuccess({
        token,
        user,
      })
    );
  } catch (err: any) {
    yield put(
      authActions.verifyOtpFailure(
        err.response?.data?.message || "OTP verification failed"
      )
    );
  }
}

/* ================= RESEND OTP ================= */
function* resendOtpWorker(
  action: PayloadAction<{ email: string }>
): Generator {
  try {
    const res: any = yield call(
      api.post,
      ENDPOINTS.AUTH.RESEND_OTP,
      action.payload
    );

    yield put(
      authActions.resendOtpSuccess({
        message: res.data?.message || "OTP resent successfully",
      })
    );
  } catch (err: any) {
    yield put(
      authActions.resendOtpFailure(
        err.response?.data?.message || "Failed to resend OTP"
      )
    );
  }
}

/* ================= FORGOT PASSWORD ================= */
function* forgotPasswordWorker(
  action: PayloadAction<{ email: string }>
): Generator {
  try {
    yield call(api.post, ENDPOINTS.AUTH.FORGOT_PASSWORD, action.payload);
    yield put(authActions.forgotPasswordSuccess());
  } catch (err: any) {
    yield put(
      authActions.forgotPasswordFailure(
        err.response?.data?.message || "Password reset failed"
      )
    );
  }
}

/* ================= LOGOUT ================= */
function* logoutWorker(): Generator {
  setAuthToken(undefined);
}

/* ================= WATCHER ================= */
export default function* authSaga(): Generator {
  yield takeLatest(authActions.signupRequest.type, signupWorker);
  yield takeLatest(authActions.loginRequest.type, loginWorker);
  yield takeLatest(authActions.verifyOtpRequest.type, verifyOtpWorker);
  yield takeLatest(authActions.resendOtpRequest.type, resendOtpWorker);
  yield takeLatest(authActions.forgotPasswordRequest.type, forgotPasswordWorker);
  yield takeLatest(authActions.logout.type, logoutWorker);
}
