import Avatar from '@/components/Avatar';
import Heading from '@/components/Heading';
import SectionBox from '@/components/SectionBox';
import ChangePasswordForm from '@/features/authentication/ChangePasswordForm';
import UpdateAccountForm from '@/features/authentication/UpdateAccountForm';
import { useUser } from '@/features/authentication/useUser';
import { Flex, Stack, Text } from '@chakra-ui/react';

const Profile = () => {
  const { isLoading, user } = useUser();

  return (
    <Stack gapY='4'>
      <Heading marginBottom='2'>Profile</Heading>

      <SectionBox
        display='flex'
        flexDirection='column'
        bgColor='var(--color-grey-0)'
        padding='6'
        paddingX='8'
      >
        <Flex alignItems='center' gap='4' marginBottom='6'>
          <Avatar
            avatarSrc={user?.user_metadata.avatar}
            fullName={user?.user_metadata.fullName}
            size='2xl'
            w='7.2rem'
            h='7.2rem'
            isLoadingAvatar={isLoading}
          />

          <Flex flexDir='column' gap='1'>
            <Heading as='h3' fontSize='1.2rem'>
              {user?.user_metadata.fullName}
            </Heading>
            <Text fontSize='.8rem' color='var(--color-grey-500)'>
              {user?.user_metadata.email}
            </Text>
          </Flex>
        </Flex>

        <UpdateAccountForm user={user} />
      </SectionBox>

      <Heading as='h4' fontSize='1.2rem' marginTop='4' fontWeight='600'>
        Change password
      </Heading>

      <ChangePasswordForm />
    </Stack>
  );
};

export default Profile;
