import { Flex, SkeletonCircle, SkeletonText, For, Box, Circle } from '@chakra-ui/react';
import DashboardBox from './DashboardBox';
import Heading from '@/components/Heading';

const DurationSkeleton = () => {
  return (
    <DashboardBox display='flex' flexDirection='column' padding='6' gridColumn='3 / -1' gap='8'>
      <Heading as='h3' fontSize='xl'>
        Stay duration summary
      </Heading>
      <Flex alignItems='center' justifyContent='space-around'>
        <Box position='relative'>
          <SkeletonCircle size='14rem' variant='shine' />
          <Circle
            inset='50% 50% auto auto'
            translate='50% -50% 0'
            bgColor='var(--color-grey-0)'
            size='11rem'
            position='absolute'
          />
        </Box>
        <Box>
          <For each={['', '', '', '', '', '', '']}>
            {() => (
              <Flex width='4rem' marginTop='1.5' gap='1'>
                <SkeletonCircle size='1rem' variant='shine' />
                <SkeletonText noOfLines={1} variant='shine' />
              </Flex>
            )}
          </For>
        </Box>
      </Flex>
    </DashboardBox>
  );
};

export default DurationSkeleton;
