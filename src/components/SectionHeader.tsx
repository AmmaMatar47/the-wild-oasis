import { Flex, FlexProps } from '@chakra-ui/react';

const SectionHeader: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex marginBottom='8' justifyContent='space-between' alignItems='center' {...props}>
      {children}
    </Flex>
  );
};

export default SectionHeader;
