import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type KycStatus = "NOT_STARTED" | "PENDING" | "APPROVED" | "REJECTED";

export type KycStep =
  | "START"
  | "PERSONAL_DETAILS"
  | "DOCUMENT_UPLOAD"
  | "REVIEW_DOCUMENTS"
  | "STATUS";

interface KycState {
  status: KycStatus;
  skipped: boolean;
  currentStep: KycStep;
  loading: boolean;
  error: string | null;
  rejectionReason?: string;
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
    /* ---------- FRONTEND STEP CONTROL ---------- */
    goToStep(state, action: PayloadAction<KycStep>) {
      state.currentStep = action.payload;
    },

    /* ---------- SUBMIT FULL KYC ---------- */
    submitKycRequest(state) {
      state.loading = true;
      state.error = null;
    },

    submitKycSuccess(state) {
      state.loading = false;
      state.status = "PENDING"; // backend sets pending
      state.currentStep = "STATUS";
      state.skipped = false;
    },

    submitKycFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------- ADMIN / BACKEND RESULT ---------- */
    markKycApproved(state) {
      state.status = "APPROVED";
      state.currentStep = "STATUS";
      state.skipped = false;
    },

    markKycRejected(
      state,
      action: PayloadAction<{ reason: string }>
    ) {
      state.status = "REJECTED";
      state.currentStep = "STATUS";
      state.rejectionReason = action.payload.reason;
    },

    /* ---------- SKIP KYC ---------- */
    skipKyc(state) {
      state.skipped = true;
      state.currentStep = "STATUS";
    },

    /* ================= RESET ON LOGOUT ================= */
    resetKycSession() {
      // Reset to initial state on logout
      return initialState;
    },

    /* ================= RESET ERROR ================= */
    resetAuthError(state) {
      state.error = null;
    },
}
});


export const kycActions = kycSlice.actions;
export default kycSlice.reducer;
