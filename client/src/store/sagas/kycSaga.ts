import { takeLatest, call, put } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { KycStatus } from "../slices/kycSlice";
import { kycActions } from "../slices/kycSlice";
import {
  submitKyc as submitKycApi,
  getKycStatus as getKycStatusApi,
} from "@/services/kyc.service";
import { select } from "redux-saga/effects";

const selectPersonalDetails = (state: any) => state.kyc.personalDetails;

/* =========================
   TYPES
========================= */

interface SubmitKycPayload {
  aadhaarFile: File;
  panFile: File;
  selfieFile?: File | null;
  aadhaarNumber: string;
  panNumber: string;
}

/* =========================
   SUBMIT KYC WORKER
========================= */

function* submitKycWorker(
  action: PayloadAction<SubmitKycPayload>,
): Generator<any, any, any> {
  try {
    const { aadhaarFile, panFile, selfieFile, aadhaarNumber, panNumber } =
      action.payload;

    // 👇 get personal details from redux
    const personalDetails = yield select(selectPersonalDetails);

    const formData = new FormData();

    // Files
    formData.append("aadhaar", aadhaarFile);
    formData.append("pan", panFile);

    if (selfieFile) {
      formData.append("selfie", selfieFile);
    }

    // 👇 Match backend field names EXACTLY
    formData.append("aadhaarNo", aadhaarNumber);
    formData.append("panNo", panNumber);

    // 👇 Append personal details
    formData.append("firstName", personalDetails.firstName);
    formData.append("middleName", personalDetails.middleName || "");
    formData.append("lastName", personalDetails.lastName);
    formData.append("dob", personalDetails.dob);
    formData.append("phone", personalDetails.phone);

    formData.append("residentialAddress", personalDetails.address);
    formData.append("city", personalDetails.city);
    formData.append("state", personalDetails.state);
    formData.append("pincode", personalDetails.pincode);
    formData.append("country", personalDetails.country);

    const response = yield call(submitKycApi, formData);

    const status: KycStatus =
      (response?.data?.data?.status?.toUpperCase() as KycStatus) || "PENDING";

    yield put(kycActions.submitKycSuccess({ status }));
  } catch (e: any) {
    yield put(
      kycActions.submitKycFailure(
        e?.response?.data?.message || "KYC submission failed",
      ),
    );
  }
}
/* =========================
   FETCH STATUS WORKER
========================= */

function* fetchKycStatusWorker(): Generator<any, any, any> {
  try {
    const response = yield call(getKycStatusApi);

    yield put(
      kycActions.setKycStatus({
        status: response?.data?.status,
        rejectionReason: response?.data?.rejectionReason,
      }),
    );
  } catch (e) {
    yield put(kycActions.fetchKycStatusFailure());
  }
}

/* =========================
   ROOT SAGA
========================= */

export default function* kycSaga() {
  yield takeLatest(kycActions.submitKycRequest.type, submitKycWorker);

  yield takeLatest(kycActions.fetchKycStatusRequest.type, fetchKycStatusWorker);
}
