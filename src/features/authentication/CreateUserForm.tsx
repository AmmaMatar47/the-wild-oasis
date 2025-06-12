import InputField from "@/components/InputField";
import { createUser } from "@/services/api/authApi";
import { Button, Flex, Separator } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const initialUserValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const createUserFormValidation = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name cannot exceed 20 characters")
    .required("Full name is required"),

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

const CreateUserForm = () => {
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const handleSubmit = (values: typeof initialUserValues) => {
    const { fullName, email, password } = values;
    setIsCreatingUser(true);
    createUser({ fullName, email, password }).finally(() => {
      setIsCreatingUser(false);
    });
  };

  const formik = useFormik({
    initialValues: initialUserValues,
    onSubmit: handleSubmit,
    validationSchema: createUserFormValidation,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputField
        name="fullName"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        label="User name"
        labelWidth="12rem"
        maxWidth="22rem"
        errorMessage={formik.errors.fullName}
        invalid={!!formik.errors.fullName}
        disabled={isCreatingUser}
      />
      <Separator marginY="4" />
      <InputField
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        label="Email address"
        labelWidth="12rem"
        maxWidth="22rem"
        errorMessage={formik.errors.email}
        invalid={!!formik.errors.email}
        disabled={isCreatingUser}
      />
      <Separator marginY="4" />
      <InputField
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        type="password"
        label="Password (min 8 characters)"
        labelWidth="12rem"
        maxWidth="22rem"
        errorMessage={formik.errors.password}
        invalid={!!formik.errors.password}
        disabled={isCreatingUser}
      />
      <Separator marginY="4" />
      <InputField
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        type="password"
        label="Confirm password"
        labelWidth="12rem"
        maxWidth="22rem"
        errorMessage={formik.errors.confirmPassword}
        invalid={!!formik.errors.confirmPassword}
        disabled={isCreatingUser}
      />
      <Flex justifyContent="end" marginTop="6">
        <Button
          type="submit"
          bgColor="var(--color-brand-500)"
          _hover={{ bgColor: "var(--color-brand-700)" }}
          disabled={isCreatingUser}
        >
          Create new user
        </Button>
      </Flex>
    </form>
  );
};

export default CreateUserForm;
