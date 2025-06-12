import { Box, BoxProps } from "@chakra-ui/react";

const DashboardBox: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      bgColor="var(--color-grey-0)"
      padding="4"
      gap="3"
      border="solid 1px var(--color-grey-100)"
      borderRadius="md"
      {...props}
    >
      {children}
    </Box>
  );
};

export default DashboardBox;
