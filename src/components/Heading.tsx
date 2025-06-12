import { Heading as HeadingChakraUI, HeadingProps } from "@chakra-ui/react";

const Heading: React.FC<HeadingProps> = ({ ...props }) => {
  return (
    <HeadingChakraUI
      as="h1"
      fontSize="3xl"
      color="var(--color-grey-700)"
      fontFamily="Poppins, sans-serif"
      fontWeight="600"
      lineHeight="1.05"
      {...props}
    >
      {props.children}
    </HeadingChakraUI>
  );
};

export default Heading;
