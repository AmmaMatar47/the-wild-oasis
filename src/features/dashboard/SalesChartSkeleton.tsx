import { Heading, Skeleton } from '@chakra-ui/react';
import DashboardBox from './DashboardBox';

const SalesChartSkeleton = () => {
  return (
    <DashboardBox padding='6' gridColumn='1 / -1'>
      <Heading as='h3' fontSize='xl' marginBottom='8'>
        Sales from <Skeleton display='inline' variant='shine' />
      </Heading>
      <Skeleton width='100%' height='80%' variant='shine' />
    </DashboardBox>
  );
};

export default SalesChartSkeleton;
