import { Separator as ChakraUISeparator } from "@chakra-ui/react";

const Separator = ({ ...props }) => {
  return (
    <ChakraUISeparator
      style={{ borderColor: "var(--color-grey-100)" }}
      {...props}
    />
  );
};

export default Separator;
