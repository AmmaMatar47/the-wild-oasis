import { useFormik } from "formik";
import {
  createUserFormValidation,
  initialUserValues,
} from "./signupFormConstant";
import { Field, Input, Text } from "@chakra-ui/react";
import Button from "@/components/Button";
import { Link } from "react-router";
import { useSignup } from "./useSignup";

const SignupForm = () => {
  const { mutate: signup, isPending: isSigningUp } = useSignup();

  const handleSubmit = (values: typeof initialUserValues) => {
    const { fullName, email, password } = values;
    signup({ fullName, email, password });
  };

  const formik = useFormik({
    initialValues: initialUserValues,
    onSubmit: handleSubmit,
    validationSchema: createUserFormValidation,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field.Root
        marginBottom="6"
        color="var(--color-grey-700)"
        invalid={!!formik.errors.fullName && formik.touched.fullName}
      >
        <Field.Label>Username</Field.Label>
        <Input
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          focusRingColor="var(--color-brand-600)"
          placeholder="Username (e.g., Ammar Matar)"
          boxShadow="var(--shadow-sm)"
          border="solid 1px var(--color-grey-300)"
          disabled={isSigningUp}
        />
        <Field.ErrorText>{formik.errors.fullName}</Field.ErrorText>
      </Field.Root>

      <Field.Root
        marginBottom="6"
        color="var(--color-grey-700)"
        invalid={!!formik.errors.email && formik.touched.email}
      >
        <Field.Label>Email address</Field.Label>
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="your.email@example.com"
          focusRingColor="var(--color-brand-600)"
          boxShadow="var(--shadow-sm)"
          border="solid 1px var(--color-grey-300)"
          disabled={isSigningUp}
        />
        <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
      </Field.Root>

      <Field.Root
        marginBottom="6"
        color="var(--color-grey-700)"
        invalid={!!formik.errors.password && formik.touched.password}
      >
        <Field.Label>Password</Field.Label>
        <Input
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Create a password (min. 8 chars)"
          focusRingColor="var(--color-brand-600)"
          boxShadow="var(--shadow-sm)"
          border="solid 1px var(--color-grey-300)"
          disabled={isSigningUp}
        />
        <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
      </Field.Root>

      <Field.Root
        marginBottom="8"
        color="var(--color-grey-700)"
        invalid={
          !!formik.errors.confirmPassword && formik.touched.confirmPassword
        }
      >
        <Field.Label>Confirm password</Field.Label>
        <Input
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Re-enter password"
          focusRingColor="var(--color-brand-600)"
          boxShadow="var(--shadow-sm)"
          border="solid 1px var(--color-grey-300)"
          disabled={isSigningUp}
        />
        <Field.ErrorText>{formik.errors.confirmPassword}</Field.ErrorText>
      </Field.Root>

      <Text fontSize=".8rem" textAlign="center" color="var(--color-grey-500)">
        Already have an account?{" "}
        <Link to="/login" className="link-btn">
          Login
        </Link>
      </Text>
      <Button
        type="submit"
        w="100%"
        marginTop="6"
        loading={isSigningUp}
        loadingText="Signing up"
        disabled={!formik.isValid}
      >
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
