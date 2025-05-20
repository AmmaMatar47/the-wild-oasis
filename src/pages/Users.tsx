import Heading from '@/components/Heading';
import SectionHeader from '@/components/SectionHeader';
import CreateUserForm from '@/features/auth/CreateUserForm';
import { Box } from '@chakra-ui/react';

const Users = () => {
  return (
    <>
      <SectionHeader>
        <Heading>Create a new user</Heading>
      </SectionHeader>

      <Box
        bgColor='var(--color-grey-0)'
        borderRadius='md'
        paddingY='6'
        paddingX='10'
        boxShadow='var(--shadow-sm)'
      >
        <CreateUserForm />
      </Box>
    </>
  );
};

export default Users;
