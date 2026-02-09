import api from "@/lib/api";
import { ENDPOINTS } from "./endpoints";

export const getUserProfile = () =>
  api.get(ENDPOINTS.USER.PROFILE);

export const updateUserProfile = (data: any) =>
  api.put(ENDPOINTS.USER.UPDATE_PROFILE, data);
