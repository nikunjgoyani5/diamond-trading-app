export const KYC_FLOW = {
  STARTED: "kyc_started",
  PERSONAL_DONE: "kyc_personal_done",
  DOCUMENT_DONE: "kyc_document_done",
};

export const kycSession = {
  start() {
    sessionStorage.setItem(KYC_FLOW.STARTED, "true");
  },

  personalDone() {
    sessionStorage.setItem(KYC_FLOW.PERSONAL_DONE, "true");
  },

  documentDone() {
    sessionStorage.setItem(KYC_FLOW.DOCUMENT_DONE, "true");
  },

  canAccessPersonal() {
    return sessionStorage.getItem(KYC_FLOW.STARTED) === "true";
  },

  canAccessDocument() {
    return sessionStorage.getItem(KYC_FLOW.PERSONAL_DONE) === "true";
  },

  reset() {
    sessionStorage.clear();
  },
};
