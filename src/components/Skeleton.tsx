import { Skeleton as ChakraUISkeleton, SkeletonProps } from '@chakra-ui/react';

const Skeleton: React.FC<SkeletonProps> = ({ children, ...props }) => {
  return (
    <ChakraUISkeleton
      css={{
        '--start-color': 'var(--color-grey-300)',
        '--end-color': 'var(--color-grey-200)',
      }}
      variant='shine'
      {...props}
    >
      {children}
    </ChakraUISkeleton>
  );
};

export default Skeleton;
