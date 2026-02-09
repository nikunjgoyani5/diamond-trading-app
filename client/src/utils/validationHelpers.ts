// src/utils/validationHelpers.ts

export const VALIDATION_PATTERNS = {
  // ================= GENERIC =================

  FULL_NAME: {
    value: /^[A-Za-z\s]{2,50}$/,
    message: "Name must be 2–50 characters and contain only letters",
  },

  EMAIL: {
    value: /^\S+@\S+\.\S+$/,
    message: "Please enter a valid email address",
  },

  PASSWORD: {
    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/,
    message:
      "Must include uppercase, lowercase, number, and special character",
  },

  PINCODE: {
    value: /^\d{6}$/,
    message: "Pincode must be exactly 6 digits",
  },

  // ================= KYC =================

  NAME_PART: {
    value: /^[A-Za-z]{2,30}$/,
    message: "Only letters allowed (2–30 characters)",
  },

  PHONE_10_DIGITS: {
    value: /^[0-9]{10}$/,
    message: "Phone number must be exactly 10 digits",
  },

  NO_EDGE_SPACES: {
    value: /^(?!\s)(?!.*\s$).+$/,
    message: "Must not start or end with spaces",
  },

  // ================= NUMERIC / TEXT =================

  POSITIVE_DECIMAL: {
    value: /^\d+(\.\d{1,2})?$/,
    message: "Must be a valid number",
  },

  CERTIFICATE_NUMBER: {
    value: /^[A-Za-z0-9-]{6,30}$/,
    message: "Enter a valid certificate number",
  },

  DESCRIPTION: {
    value: /^.{0,1000}$/,
    message: "Description must be under 1000 characters",
  },
};
