import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const PageError = ({ message }: { message: string }) => {
  return (
    <Center marginTop="40">
      <Flex flexDirection="column" alignItems="center" gap="1">
        <HiOutlineExclamationCircle size={120} stroke="var(--color-red-500)" />
        <Heading fontSize="xl" color="var(--color-grey-700)">
          An unexpected error occurred!
        </Heading>
        <Text color="var(--color-grey-500)">{message}</Text>
      </Flex>
    </Center>
  );
};

export default PageError;
