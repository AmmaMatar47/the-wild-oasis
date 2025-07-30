import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Separator from "@/components/Separator";
import { PasswordInput } from "@/components/ui/password-input";
import { createUser } from "@/services/api/authApi";
import { Field, Flex } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import {
  createUserFormValidation,
  initialUserValues,
} from "./signupFormConstant";

const CreateUserForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values: typeof initialUserValues) => {
    const { fullName, email, password } = values;
    setIsLoading(true);
    createUser({ fullName, email, password })
      .then(() => formik.resetForm())
      .finally(() => {
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: initialUserValues,
    onSubmit: handleSubmit,
    validationSchema: createUserFormValidation,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputField
        name="fullName"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label="Username"
        placeholder="(e.g., Ammar Matar)"
        labelWidth="12rem"
        maxWidth="22rem"
        errorMessage={formik.errors.fullName}
        invalid={!!formik.errors.fullName && formik.touched.fullName}
        disabled={isLoading}
        required
      />
      <Separator marginY="4" />
      <InputField
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="your.email@example.com"
        label="Email address"
        labelWidth="12rem"
        maxWidth="22rem"
        errorMessage={formik.errors.email}
        invalid={!!formik.errors.email && formik.touched.email}
        disabled={isLoading}
        required
      />
      <Separator marginY="4" />

      <Field.Root
        marginBottom="6"
        color="var(--color-grey-700)"
        orientation="horizontal"
        justifyContent="start"
        gap="6.2rem"
        invalid={!!formik.errors.password && formik.touched.password}
        required
      >
        <Field.Label minW="12rem">
          Password <Field.RequiredIndicator />
        </Field.Label>
        <PasswordInput
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="At least 8 characters"
          focusRingColor="var(--color-brand-600)"
          boxShadow="var(--shadow-sm)"
          border="solid 1px var(--color-grey-300)"
          width="22rem"
          disabled={isLoading}
        />
        <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
      </Field.Root>

      <Separator marginY="4" />

      <Field.Root
        marginBottom="6"
        color="var(--color-grey-700)"
        orientation="horizontal"
        justifyContent="start"
        gap="6.2rem"
        invalid={
          !!formik.errors.confirmPassword && formik.touched.confirmPassword
        }
        required
      >
        <Field.Label minW="12rem">
          Confirm password <Field.RequiredIndicator />
        </Field.Label>
        <PasswordInput
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Re-enter password"
          focusRingColor="var(--color-brand-600)"
          boxShadow="var(--shadow-sm)"
          border="solid 1px var(--color-grey-300)"
          width="22rem"
          disabled={isLoading}
        />
        <Field.ErrorText>{formik.errors.confirmPassword}</Field.ErrorText>
      </Field.Root>

      <Flex justifyContent="end" marginTop="6">
        <Button type="submit" loading={isLoading}>
          Create new user
        </Button>
      </Flex>
    </form>
  );
};

export default CreateUserForm;
