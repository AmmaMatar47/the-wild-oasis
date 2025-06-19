import { Heading, Box } from '@chakra-ui/react';
import SectionBox from '../../components/SectionBox';
import SkeletonText from '@/components/SkeletonText';
import Skeleton from '@/components/Skeleton';

const SalesChartSkeleton = () => {
  return (
    <SectionBox padding='6' gridColumn='1 / -1'>
      <Heading as='h3' fontSize='xl' marginBottom='8'>
        <SkeletonText h='1.4rem' w='14.2rem' noOfLines={1} variant='shine' />
      </Heading>
      <Box position='relative' height='80%'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          style={{ position: 'absolute', top: 0 }}
        >
          <path
            fill='var(--color-grey-0)'
            fillOpacity='1'
            d='M0,96L20,101.3C40,107,80,117,120,133.3C160,149,200,171,240,176C280,181,320,171,360,160C400,149,440,139,480,128C520,117,560,107,600,138.7C640,171,680,245,720,266.7C760,288,800,256,840,224C880,192,920,160,960,122.7C1000,85,1040,43,1080,37.3C1120,32,1160,64,1200,106.7C1240,149,1280,203,1320,186.7C1360,171,1400,85,1420,42.7L1440,0L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z'
          ></path>
        </svg>

        <Skeleton width='100%' height='100%' variant='shine' />
      </Box>
    </SectionBox>
  );
};

export default SalesChartSkeleton;
