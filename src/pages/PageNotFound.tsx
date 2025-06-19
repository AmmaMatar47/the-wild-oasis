import Heading from "@/components/Heading";
import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import Button from "./../components/Button";

const PageNotFound = () => {
  return (
    <Flex alignItems="center" justifyContent="center" h="100vh">
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        gap="4"
        bgColor="var(--color-grey-50)"
        padding="8"
        borderRadius="xl"
        shadow="md"
      >
        <Text fontSize="3.8rem" color="var(--color-grey-700)">
          404
        </Text>
        <Heading>Page Not Found</Heading>
        <Text color="var(--color-grey-500)" marginBottom="4">
          The page you're looking for doesn't exist.
        </Text>

        <Button asChild>
          <Link to="/dashboard">Go home</Link>
        </Button>
      </Flex>
    </Flex>
  );
};

export default PageNotFound;
