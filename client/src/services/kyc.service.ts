import api from "@/lib/api";
import { ENDPOINTS } from "./endpoints";

export const fetchKycStatus = () =>
  api.get(ENDPOINTS.KYC.STATUS);

export const submitPersonalDetails = (data: any) =>
  api.post(ENDPOINTS.KYC.PERSONAL_DETAILS, data);

export const uploadDocuments = (data: FormData) =>
  api.post(ENDPOINTS.KYC.DOCUMENTS, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const submitFinalKyc = () =>
  api.post(ENDPOINTS.KYC.SUBMIT);
