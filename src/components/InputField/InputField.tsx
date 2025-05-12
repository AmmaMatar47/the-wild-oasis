import { Field, Input, InputProps } from '@chakra-ui/react';

interface InputFiledProps extends InputProps {
  label: string;
  errorMessage?: string;
  invalid?: boolean;
}

const InputField = ({ label, errorMessage, invalid, ...props }: InputFiledProps) => {
  return (
    <Field.Root justifyContent='start' orientation='horizontal' gap='6.2rem' invalid={invalid}>
      <Field.Label>{label}</Field.Label>
      <Input focusRingColor='var(--color-brand-600)' maxW='16.8rem' {...props} />
      <Field.ErrorText>{errorMessage}</Field.ErrorText>
    </Field.Root>
  );
};

export default InputField;
