import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Separator from '@/components/Separator';
import { createUser } from '@/services/api/authApi';
import { Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { createUserFormValidation, initialUserValues } from './signupFormConstant';

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
        name='fullName'
        value={formik.values.fullName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label='Username'
        placeholder='(e.g., Ammar Matar)'
        labelWidth='12rem'
        maxWidth='22rem'
        errorMessage={formik.errors.fullName}
        invalid={!!formik.errors.fullName && formik.touched.fullName}
        disabled={isLoading}
        required
      />
      <Separator marginY='4' />
      <InputField
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder='your.email@example.com'
        label='Email address'
        labelWidth='12rem'
        maxWidth='22rem'
        errorMessage={formik.errors.email}
        invalid={!!formik.errors.email && formik.touched.email}
        disabled={isLoading}
        required
      />
      <Separator marginY='4' />
      <InputField
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type='password'
        label='Password'
        placeholder='At least 8 characters'
        labelWidth='12rem'
        maxWidth='22rem'
        errorMessage={formik.errors.password}
        invalid={!!formik.errors.password && formik.touched.password}
        disabled={isLoading}
        required
      />
      <Separator marginY='4' />
      <InputField
        name='confirmPassword'
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder='Re-enter password'
        type='password'
        label='Confirm password'
        labelWidth='12rem'
        maxWidth='22rem'
        errorMessage={formik.errors.confirmPassword}
        invalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
        disabled={isLoading}
        required
      />
      <Flex justifyContent='end' marginTop='6'>
        <Button
          type='submit'
          loading={isLoading}
          disabled={!formik.isValid}
          loadingText='Creating account...'
        >
          Create new user
        </Button>
      </Flex>
    </form>
  );
};

export default CreateUserForm;
