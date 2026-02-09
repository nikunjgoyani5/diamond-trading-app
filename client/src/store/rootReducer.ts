import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import kycReducer from "./slices/kycSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  kyc: kycReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // ✅ REQUIRED
export default rootReducer;
