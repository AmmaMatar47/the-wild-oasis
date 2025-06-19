import { SkeletonText as ChakraUISkeletonText, SkeletonTextProps } from '@chakra-ui/react';

const SkeletonText: React.FC<SkeletonTextProps> = ({ children, ...props }) => {
  return (
    <ChakraUISkeletonText
      css={{
        '--start-color': 'var(--color-grey-300)',
        '--end-color': 'var(--color-grey-200)',
      }}
      variant='shine'
      {...props}
    >
      {children}
    </ChakraUISkeletonText>
  );
};

export default SkeletonText;
