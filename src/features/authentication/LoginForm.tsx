import Button from '@/components/Button';
import { Field, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from './useLogin';

const initialValues = {
  email: 'raedamar00@gmail.com',
  password: '12345678',
};

const logInValidation = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const { mutate, isLoading } = useLogin();

  const handleSubmit = (values: typeof initialValues) => {
    mutate(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: logInValidation,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field.Root marginBottom='6' color='var(--color-grey-700)' invalid={!!formik.errors.email}>
        <Field.Label>Email address</Field.Label>
        <Input
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          focusRingColor='var(--color-brand-600)'
          boxShadow='var(--shadow-sm)'
          border='solid 1px var(--color-grey-300)'
          disabled={isLoading}
        />
        <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
      </Field.Root>

      <Field.Root marginBottom='7' color='var(--color-grey-700)' invalid={!!formik.errors.password}>
        <Field.Label>Password</Field.Label>
        <Input
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          type='password'
          focusRingColor='var(--color-brand-600)'
          boxShadow='var(--shadow-sm)'
          border='solid 1px var(--color-grey-300)'
          disabled={isLoading}
        />
        <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
      </Field.Root>

      <Button type='submit' w='100%' disabled={isLoading}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
