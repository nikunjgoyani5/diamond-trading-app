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
  action: PayloadAction<{ name: string; email: string; password: string }>
): Generator {
  try {
    console.log("Signup success saga triggered");

    yield call(api.post, ENDPOINTS.AUTH.REGISTER, action.payload);

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

    // Email exists but not verified
    if (err.response?.data?.data?.isEmailVerified === false) {
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
  action: PayloadAction<{
    email: string;
    otp: string;
    mode: "VERIFY_EMAIL" | "FORGOT_PASSWORD";
  }>
): Generator {
  try {
    const { email, otp, mode } = action.payload;

    // ONLY call API for VERIFY_EMAIL mode
    if (mode === "VERIFY_EMAIL") {
      yield call(api.post, ENDPOINTS.AUTH.VERIFY_EMAIL, {
        email,
        otp,
      });
      
      yield put(authActions.verifyOtpSuccess({ mode }));
    } else if (mode === "FORGOT_PASSWORD") {
      // For FORGOT_PASSWORD mode:
      // - Do NOT call /reset-password here (it requires newPassword)
      // - Just mark OTP as verified in Redux and store the OTP
      // - ResetPassword page will call /reset-password with all required fields
      
      yield put(authActions.verifyOtpSuccess({ mode, otp }));
      
      // Note: We're trusting the OTP is valid. The actual validation
      // will happen when user submits the new password on ResetPassword page.
      // If OTP is invalid, /reset-password will return 400 at that point.
    }
  } catch (err: any) {
    yield put(
      authActions.verifyOtpFailure(
        err.response?.data?.message || "OTP verification failed"
      )
    );
  }
}

function* resetPasswordWorker(
  action: PayloadAction<{
    email: string;
    otp: string;
    newPassword: string;
  }>
): Generator {
  try {
    yield call(api.post, ENDPOINTS.AUTH.RESET_PASSWORD, {
      email: action.payload.email,
      otp: action.payload.otp,
      newPassword: action.payload.newPassword,
    });

    yield put(authActions.resetPasswordSuccess());
  } catch (err: any) {
    yield put(
      authActions.resetPasswordFailure(
        err.response?.data?.message || "Password reset failed"
      )
    );
  }
}








/* ================= RESEND OTP ================= */

function* resendOtpWorker(
  action: PayloadAction<{ email: string }>
): Generator {
  try {
    yield call(
      api.post,
      ENDPOINTS.AUTH.RESEND_OTP,
      action.payload
    );

    yield put(authActions.resendOtpSuccess());
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
    yield call(
      api.post,
      ENDPOINTS.AUTH.FORGOT_PASSWORD,
      action.payload
    );

    yield put(authActions.forgotPasswordSuccess({ email: action.payload.email }));
  } catch (err: any) {
    yield put(
      authActions.forgotPasswordFailure(
        err.response?.data?.message || "Password reset failed"
      )
    );
  }
}

/* ================= WATCHERS ================= */

export default function* authSaga(): Generator {
  yield takeLatest(authActions.signupRequest.type, signupWorker);
  yield takeLatest(authActions.loginRequest.type, loginWorker);
  yield takeLatest(authActions.verifyOtpRequest.type, verifyOtpWorker);
  yield takeLatest(authActions.resendOtpRequest.type, resendOtpWorker);
  yield takeLatest(
    authActions.forgotPasswordRequest.type,
    forgotPasswordWorker
  );
  yield takeLatest(
  authActions.resetPasswordRequest.type,
  resetPasswordWorker
);

}
