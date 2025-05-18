import { Checkbox as CheckboxChakraUI, CheckboxRootProps } from '@chakra-ui/react';

interface CheckboxProps extends CheckboxRootProps {}

const Checkbox: React.FC<CheckboxRootProps> = ({ children, ...props }: CheckboxProps) => {
  return (
    <CheckboxChakraUI.Root
      bgColor='var(--color-grey-0)'
      color='var(--color-grey-700)'
      colorPalette='purple'
      width='100%'
      padding='6'
      borderRadius='sm'
      {...props}
    >
      <CheckboxChakraUI.HiddenInput />
      <CheckboxChakraUI.Control />
      <CheckboxChakraUI.Label fontSize='md' fontWeight='400'>
        {children}
      </CheckboxChakraUI.Label>
    </CheckboxChakraUI.Root>
  );
};

export default Checkbox;
