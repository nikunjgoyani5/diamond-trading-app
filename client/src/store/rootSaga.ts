import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga";
import kycSaga from "./sagas/kycSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    kycSaga(),
  ]);
}
