import { Field, Input, InputProps } from "@chakra-ui/react";

interface InputFiledProps extends InputProps {
  label: string;
  errorMessage?: string;
  invalid?: boolean;
  labelWidth?: string;
}

const InputField = ({
  label,
  errorMessage,
  invalid,
  labelWidth = "auto",
  ...props
}: InputFiledProps) => {
  return (
    <Field.Root
      justifyContent="start"
      orientation="horizontal"
      gap="6.2rem"
      invalid={invalid}
      required={props.required}
    >
      <Field.Label
        textWrap="nowrap"
        color="var(--color-grey-700)"
        minW={labelWidth}
      >
        {label} <Field.RequiredIndicator />
      </Field.Label>
      <Input
        maxW="16.8rem"
        focusRingColor="var(--color-brand-600)"
        boxShadow="var(--shadow-sm)"
        border={invalid ? "" : `solid 1px var(--color-grey-300)`}
        {...props}
      />
      <Field.ErrorText>{errorMessage}</Field.ErrorText>
    </Field.Root>
  );
};

export default InputField;
