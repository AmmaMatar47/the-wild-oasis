import { ButtonProps, Button as ChakraUiButton } from "@chakra-ui/react";

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <ChakraUiButton
      bgColor="var(--color-brand-600)"
      _hover={{ bgColor: "var(--color-brand-700)" }}
      color="#fff"
      fontSize=".875rem"
      {...props}
    >
      {children}
    </ChakraUiButton>
  );
};

export default Button;
