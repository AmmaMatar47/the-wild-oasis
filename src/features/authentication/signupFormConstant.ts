import * as Yup from "yup";

export const initialUserValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const createUserFormValidation = Yup.object().shape({
  fullName: Yup.string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^(?![_. ])(?!.*[_. ]{2})[a-zA-Z0-9._ ]+(?<![_. ])$/,
      "Invalid username format",
    )
    .required("Username name is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm password"),
});
