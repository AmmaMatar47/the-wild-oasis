import Button from "@/components/Button";
import InputField from "@/components/InputField";
import SectionBox from "@/components/SectionBox";
import { Flex, Separator } from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { changePassword } from "@/services/api/authApi";

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
  const handleSubmit = (values: typeof initialUserValues) => {
    console.log(values);
    changePassword(values.password);
  };

  const formik = useFormik({
    initialValues: initialUserValues,
    onSubmit: handleSubmit,
    validationSchema: changePasswordFormValidation,
  });

  return (
    <SectionBox padding="8">
      <form onSubmit={formik.handleSubmit}>
        <InputField
          type="password"
          label="New password (min 8 char)"
          labelWidth="13rem"
          minW="26rem"
          name="password"
          value={formik.values.password}
          errorMessage={formik.errors.password}
          onChange={formik.handleChange}
          invalid={!!formik.errors.password}
        />
        <Separator marginY="1.4rem" />
        <InputField
          type="password"
          label="Confirm password"
          labelWidth="13rem"
          minW="26rem"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          errorMessage={formik.errors.confirmPassword}
          onChange={formik.handleChange}
          invalid={!!formik.errors.confirmPassword}
        />

        <Flex justifyContent="end" marginTop="1.6rem">
          <Button
            size="sm"
            fontSize="sm"
            disabled={!formik.isValid}
            type="submit"
          >
            Change password
          </Button>
        </Flex>
      </form>
    </SectionBox>
  );
};

export default ChangePasswordForm;
