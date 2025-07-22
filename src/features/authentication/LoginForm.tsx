import Button from '@/components/Button';
import { Field, Input, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from './useLogin';
import { Link } from 'react-router';

const initialValues = {
  email: '',
  password: '',
};

const logInValidation = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const { mutate, isPending } = useLogin();

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
      <Field.Root
        marginBottom='6'
        color='var(--color-grey-700)'
        invalid={!!formik.errors.email && formik.touched.email}
      >
        <Field.Label>Email address</Field.Label>
        <Input
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='your.email@example.com'
          focusRingColor='var(--color-brand-600)'
          boxShadow='var(--shadow-sm)'
          border='solid 1px var(--color-grey-300)'
          disabled={isPending}
        />
        <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
      </Field.Root>

      <Field.Root
        marginBottom='4'
        color='var(--color-grey-700)'
        invalid={!!formik.errors.password && formik.touched.password}
      >
        <Field.Label>Password</Field.Label>
        <Input
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='At least 8 characters'
          type='password'
          focusRingColor='var(--color-brand-600)'
          boxShadow='var(--shadow-sm)'
          border='solid 1px var(--color-grey-300)'
          disabled={isPending}
        />
        <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
      </Field.Root>

      <Text fontSize='0.8rem' textAlign='center' color='var(--color-grey-500)'>
        Don't have an account?{' '}
        <Link to='/signup' className='link-btn'>
          Sign up
        </Link>
      </Text>

      <Button type='submit' w='100%' marginTop='4' loading={isPending}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
