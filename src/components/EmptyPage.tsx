import { EmptyState, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';

const EmptyPage = ({
  description,
  title,
  Icon,
}: {
  description: string;
  title: string;
  Icon: IconType;
}) => {
  return (
    <EmptyState.Root size='lg'>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Icon />
        </EmptyState.Indicator>
        <VStack textAlign='center'>
          <EmptyState.Title color='var(--color-grey-800)'>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default EmptyPage;
