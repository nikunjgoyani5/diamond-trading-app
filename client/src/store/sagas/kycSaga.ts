import { takeLatest, call, put } from "redux-saga/effects";
import {
  submitPersonalDetails,
  uploadDocuments,
  submitFinalKyc,
  fetchKycStatus,
} from "@/services/kyc.service";
import { kycActions } from "../slices/kycSlice";

/* ---------- FETCH STATUS ---------- */
function* fetchStatusWorker(): any {
  try {
    const res = yield call(fetchKycStatus);
    yield put(
      kycActions.fetchKycStatusSuccess({
        status: res.data.status,
        step: res.data.step,
      })
    );
  } catch (e: any) {
    yield put(
      kycActions.fetchKycStatusFailure("Unable to fetch KYC status")
    );
  }
}

/* ---------- PERSONAL DETAILS ---------- */
function* personalDetailsWorker(action: any): any {
  yield call(submitPersonalDetails, action.payload);
  yield put(kycActions.submitPersonalDetailsSuccess());
}

/* ---------- DOCUMENT UPLOAD ---------- */
function* documentUploadWorker(action: any): any {
  yield call(uploadDocuments, action.payload);
  yield put(kycActions.submitDocumentsSuccess());
}

/* ---------- FINAL SUBMIT ---------- */
function* finalSubmitWorker(): any {
  yield call(submitFinalKyc);
  yield put(kycActions.submitKycFinalSuccess());
}

export default function* kycSaga() {
  yield takeLatest(
    kycActions.fetchKycStatusRequest.type,
    fetchStatusWorker
  );
  yield takeLatest(
    kycActions.submitPersonalDetailsRequest.type,
    personalDetailsWorker
  );
  yield takeLatest(
    kycActions.submitDocumentsRequest.type,
    documentUploadWorker
  );
  yield takeLatest(
    kycActions.submitKycFinalRequest.type,
    finalSubmitWorker
  );
}
