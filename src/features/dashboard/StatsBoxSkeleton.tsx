import { For, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import DashboardBox from './DashboardBox';

const StatsBoxSkeleton = () => {
  return (
    <For each={['', '', '', '']}>
      {() => (
        <DashboardBox display='flex' alignItems='center'>
          <SkeletonCircle variant='shine' rounded='full' size='16' />

          <SkeletonText variant='shine' noOfLines={2} gap={3} />
        </DashboardBox>
      )}
    </For>
  );
};

export default StatsBoxSkeleton;
