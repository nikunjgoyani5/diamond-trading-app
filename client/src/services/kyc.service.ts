import api from "@/lib/api";
import { ENDPOINTS } from "./endpoints";


export const submitKyc = (formData: FormData) =>
  api.post(ENDPOINTS.KYC.SUBMIT, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
