import Button from "@/components/Button";
import SectionBox from "@/components/SectionBox";
import Separator from "@/components/Separator";
import { PasswordInput } from "@/components/ui/password-input";
import { changePassword } from "@/services/api/authApi";
import { Field, Flex } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const initialUserValues = {
  password: "",
  confirmPassword: "",
};

const changePasswordFormValidation = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm password"),
});

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values: typeof initialUserValues) => {
    setIsLoading(true);
    changePassword(values.password)
      .then(() => {
        formik.resetForm();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: initialUserValues,
    onSubmit: handleSubmit,
    validationSchema: changePasswordFormValidation,
  });

  return (
    <SectionBox padding="8">
      <form onSubmit={formik.handleSubmit}>
        <Field.Root
          marginBottom="6"
          color="var(--color-grey-700)"
          orientation="horizontal"
          justifyContent="start"
          gap="6.2rem"
          invalid={!!formik.errors.password && formik.touched.password}
          required
        >
          <Field.Label minW="13rem">
            New password (min 8 char) <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            focusRingColor="var(--color-brand-600)"
            boxShadow="var(--shadow-sm)"
            border="solid 1px var(--color-grey-300)"
            width="26rem"
            disabled={isLoading}
          />
          <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
        </Field.Root>

        <Separator marginY="1.4rem" />

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
          <Field.Label minW="13rem">
            Confirm password <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            focusRingColor="var(--color-brand-600)"
            boxShadow="var(--shadow-sm)"
            border="solid 1px var(--color-grey-300)"
            width="26rem"
            disabled={isLoading}
          />
          <Field.ErrorText>{formik.errors.confirmPassword}</Field.ErrorText>
        </Field.Root>

        <Flex justifyContent="end" marginTop="1.6rem">
          <Button size="sm" fontSize="sm" type="submit" loading={isLoading}>
            Change password
          </Button>
        </Flex>
      </form>
    </SectionBox>
  );
};

export default ChangePasswordForm;
