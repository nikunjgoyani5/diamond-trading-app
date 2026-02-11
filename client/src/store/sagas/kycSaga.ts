import { takeLatest, call, put } from "redux-saga/effects";
import { submitKyc } from "@/services/kyc.service";
import { kycActions } from "../slices/kycSlice";

/* ---------- SUBMIT FULL KYC ---------- */
function* submitKycWorker(action: any): any {
  try {
    yield call(submitKyc, action.payload); // multipart/form-data
    yield put(kycActions.submitKycSuccess());
  } catch (e: any) {
    yield put(
      kycActions.submitKycFailure(
        e?.response?.data?.message || "KYC submission failed"
      )
    );
  }
}

export default function* kycSaga() {
  yield takeLatest(
    kycActions.submitKycRequest.type,
    submitKycWorker
  );
}
