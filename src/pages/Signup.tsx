import SignupForm from "@/features/authentication/SignupForm";
import { Box, Center, Flex } from "@chakra-ui/react";

const Signup = () => {
  return (
    <Center height="100vh" bgColor="var(--color-grey-50)">
      <Flex flexDirection="column" alignItems="center" gap="9">
        <Box
          bgColor="var(--color-grey-0)"
          paddingY="9"
          paddingX="10"
          borderRadius="lg"
          border="solid 1px var(--color-grey-100)"
          w="30rem"
        >
          <SignupForm />
        </Box>
      </Flex>
    </Center>
  );
};

export default Signup;
