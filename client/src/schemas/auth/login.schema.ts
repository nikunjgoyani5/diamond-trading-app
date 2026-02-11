import { z } from "zod";
import { emailField, passwordField } from "../common/fields.schema";

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
  rememberMe: z.boolean().optional(),
});

export type LoginForm = z.infer<typeof loginSchema>;
