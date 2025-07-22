import { StatusType } from '@/types/bookingsTypes';
import { Badge, BadgeProps } from '@chakra-ui/react';

interface StatusBadge extends BadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadge> = ({ children, status }) => {
  return (
    <Badge
      fontWeight='600'
      textTransform='uppercase'
      colorPalette={`${status === 'unconfirmed' ? 'blue' : status === 'checked-in' ? 'green' : 'grey'}`}
      justifyContent='center'
      w='7rem'
      paddingY='3px'
    >
      {children}
    </Badge>
  );
};

export default StatusBadge;
