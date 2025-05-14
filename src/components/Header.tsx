import { Heading, HeadingProps } from '@chakra-ui/react';

const Header: React.FC<HeadingProps> = ({ ...props }) => {
  return (
    <Heading
      as='h2'
      fontSize='3xl'
      color='var(--color-grey-700)'
      fontFamily='Poppins, sans-serif'
      fontWeight='600'
      lineHeight='1.05'
      {...props}
    >
      {props.children}
    </Heading>
  );
};

export default Header;
