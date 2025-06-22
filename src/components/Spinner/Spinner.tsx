import { Box, BoxProps } from '@chakra-ui/react';
import styles from './Spinner.module.scss';

interface SpinnerProps extends BoxProps {
  size?: string;
}

const Spinner = ({ size, ...props }: SpinnerProps) => {
  return (
    <Box className={styles.spinner} h={size || '6.4rem'} w={size || '6.4rem'} {...props}></Box>
  );
};

export default Spinner;
