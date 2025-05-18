import { Button, ButtonProps } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const BackButton = ({ ...props }: ButtonProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <Button
      bgColor="transparent"
      color="var(--color-brand-500)"
      fontSize="lg"
      _hover={{ color: "var(--color-brand-700)" }}
      onClick={handleGoBack}
      {...props}
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
