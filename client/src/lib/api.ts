import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =======================
   REQUEST INTERCEPTOR
======================= */
api.interceptors.request.use(
  (config) => {
    // support both remember-me and session login
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =======================
   RESPONSE INTERCEPTOR
======================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Let saga / calling code handle auth errors
    if (status === 401) {
      // optional: emit a custom event if you want
      // window.dispatchEvent(new Event("unauthorized"));
    }

    return Promise.reject(error);
  }
);

export default api;
