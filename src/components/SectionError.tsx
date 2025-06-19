import { HiExclamationCircle } from 'react-icons/hi2';
import SectionBox from './SectionBox';
import Heading from './Heading';
import { BoxProps, Text } from '@chakra-ui/react';

interface SectionErrorProps extends BoxProps {
  description: string;
}

const SectionError = ({ description, ...props }: SectionErrorProps) => {
  return (
    <SectionBox display='flex' flexDir='column' alignItems='center' paddingY='4rem' {...props}>
      <HiExclamationCircle size='76' fill='var(--color-red-700)' />
      <Heading as='h4' fontSize='1.2rem' marginBottom='.4rem' marginTop='.8rem'>
        An unexpected error occurred!{' '}
      </Heading>
      <Text color='var(--color-grey-500)' textAlign='center'>
        {description}
      </Text>
    </SectionBox>
  );
};

export default SectionError;
