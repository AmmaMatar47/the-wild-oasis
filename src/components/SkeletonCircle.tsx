import {
  SkeletonCircle as ChakraUISkeletonCircle,
  SkeletonCircleProps,
} from "@chakra-ui/react";

const SkeletonCircle: React.FC<SkeletonCircleProps> = ({
  children,
  ...props
}) => {
  return (
    <ChakraUISkeletonCircle
      css={{
        "--start-color": "var(--color-grey-300)",
        "--end-color": "var(--color-grey-200)",
      }}
      variant="shine"
      {...props}
    >
      {children}
    </ChakraUISkeletonCircle>
  );
};

export default SkeletonCircle;
