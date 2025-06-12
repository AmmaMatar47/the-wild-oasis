import Heading from '@/components/Heading';
import SectionHeader from '@/components/SectionHeader';
import SettingsEditForm from '@/features/settings/SettingsEditForm';
import { Box } from '@chakra-ui/react';

const Settings = () => {
  return (
    <>
      <SectionHeader>
        <Heading>Update hotel settings</Heading>
      </SectionHeader>

      <Box
        bgColor='var(--color-grey-0)'
        borderRadius='md'
        paddingY='6'
        paddingX='10'
        boxShadow='var(--shadow-sm)'
      >
        <SettingsEditForm />
      </Box>
    </>
  );
};

export default Settings;
