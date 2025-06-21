import Heading from '@/components/Heading';
import { useTheme } from '@/context/ThemeContext';
import LoginForm from '@/features/authentication/LoginForm';
import { Box, Center, Flex, Image } from '@chakra-ui/react';

const Login = () => {
  const { theme } = useTheme();
  return (
    <Center height='100vh' bgColor='var(--color-grey-50)'>
      <Flex flexDirection='column' alignItems='center' gap='9'>
        <Image
          src={theme === 'dark' ? `/logo-dark.png` : `/logo-light.png`}
          h='96px'
          marginBottom='2'
        />
        <Heading fontSize='1.85rem'>Log in to your account</Heading>
        <Box
          bgColor='var(--color-grey-0)'
          paddingY='9'
          paddingX='10'
          borderRadius='lg'
          border='solid 1px var(--color-grey-100)'
          w='30rem'
        >
          <LoginForm />
        </Box>
      </Flex>
    </Center>
  );
};

export default Login;
