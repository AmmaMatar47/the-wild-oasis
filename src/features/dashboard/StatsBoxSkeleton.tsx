import { For, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import SectionBox from '../../components/SectionBox';

const StatsBoxSkeleton = () => {
  return (
    <For each={['', '', '', '']}>
      {() => (
        <SectionBox display='flex' alignItems='center'>
          <SkeletonCircle variant='shine' rounded='full' size='16' />

          <SkeletonText variant='shine' noOfLines={2} gap={3} />
        </SectionBox>
      )}
    </For>
  );
};

export default StatsBoxSkeleton;
