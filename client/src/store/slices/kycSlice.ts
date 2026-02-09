import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type KycStatus =
  | "NOT_STARTED"
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export type KycStep =
  | "START"
  | "PERSONAL_DETAILS"
  | "DOCUMENT_UPLOAD"
  | "REVIEW"
  | "STATUS";

interface KycState {
  status: KycStatus;
  skipped: boolean;
  currentStep: KycStep;
  loading: boolean;
  error: string | null;
}

const initialState: KycState = {
  status: "NOT_STARTED",
  skipped: false,
  currentStep: "START",
  loading: false,
  error: null,
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    /* ---------- FETCH STATUS ---------- */
    fetchKycStatusRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchKycStatusSuccess(
      state,
      action: PayloadAction<{ status: KycStatus; step: KycStep }>
    ) {
      state.loading = false;
      state.status = action.payload.status;
      state.currentStep = action.payload.step;
      state.skipped = action.payload.status === "PENDING" && state.skipped;
    },
    fetchKycStatusFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------- STEP SUBMISSIONS ---------- */
    submitPersonalDetailsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    submitPersonalDetailsSuccess(state) {
      state.loading = false;
      state.status = "PENDING";
      state.currentStep = "DOCUMENT_UPLOAD";
    },

    submitDocumentsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    submitDocumentsSuccess(state) {
      state.loading = false;
      state.currentStep = "REVIEW";
    },

    submitKycFinalRequest(state) {
      state.loading = true;
      state.error = null;
    },
    submitKycFinalSuccess(state) {
      state.loading = false;
      state.status = "PENDING";
      state.currentStep = "STATUS";
    },

    /* ---------- ADMIN / BACKEND UPDATES ---------- */
    markKycApproved(state) {
      state.status = "APPROVED";
      state.currentStep = "STATUS";
      state.skipped = false;
      state.loading = false;
    },

    markKycRejected(state, action: PayloadAction<string>) {
      state.status = "REJECTED";
      state.currentStep = "STATUS";
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------- SKIP KYC ---------- */
    skipKyc(state) {
      state.status = "PENDING";
      state.skipped = true;
      state.currentStep = "STATUS";
      state.loading = false;
    },

    /* ---------- RESET ---------- */
    resetKycError(state) {
      state.error = null;
    },
  },
});

export const kycActions = kycSlice.actions;
export default kycSlice.reducer;
