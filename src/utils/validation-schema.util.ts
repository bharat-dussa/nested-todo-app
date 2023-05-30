import * as Yup from "yup";

export const LOGIN_FORM_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "min 3 characters are required")
    .max(20, "max 20 characters are allowed"),
});
