import { For } from '@chakra-ui/react';
import SectionBox from '../../components/SectionBox';
import SkeletonCircle from '@/components/SkeletonCircle';
import SkeletonText from '@/components/SkeletonText';

const StatsBoxSkeleton = () => {
  return (
    <For each={new Array(4).fill('')}>
      {() => (
        <SectionBox display='flex' alignItems='center' key={crypto.randomUUID()}>
          <SkeletonCircle variant='shine' rounded='full' size='16' />

          <SkeletonText variant='shine' noOfLines={2} gap={3} />
        </SectionBox>
      )}
    </For>
  );
};

export default StatsBoxSkeleton;
