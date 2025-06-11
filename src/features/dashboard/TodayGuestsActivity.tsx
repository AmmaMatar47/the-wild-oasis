import Heading from '@/components/Heading';
import { List, Separator, For, EmptyState, VStack, BoxProps, SkeletonText } from '@chakra-ui/react';
import { useTodayActivity } from './useTodayActivity';
import DashboardBox from './DashboardBox';
import ListItem from './ListItem';

const TodayGuestsActivity = ({ ...props }: BoxProps) => {
  const { activities, isLoading } = useTodayActivity();

  return (
    <DashboardBox padding='6' {...props}>
      <Heading as='h3' fontSize='xl' marginBottom='6'>
        Today
      </Heading>

      <List.Root overflowY='auto' height='84%'>
        {isLoading ? (
          <For each={['', '', '', '', '', '']}>
            {(_, i) => (
              <>
                {i === 0 ? null : <Separator style={{ borderColor: 'var(--color-grey-100)' }} />}
                <SkeletonText noOfLines={1} marginY='3' variant='shine' />
              </>
            )}
          </For>
        ) : (
          <For
            each={activities}
            fallback={
              <EmptyState.Root size='sm' paddingY='4rem'>
                <EmptyState.Content>
                  <VStack textAlign='center'>
                    <EmptyState.Title color='var(--color-grey-600)'>
                      No Activity Today
                    </EmptyState.Title>
                    <EmptyState.Description>
                      There are no arrivals or departures scheduled for today.
                    </EmptyState.Description>
                  </VStack>
                </EmptyState.Content>
              </EmptyState.Root>
            }
          >
            {(booking, i) => (
              <>
                {i === 0 ? null : <Separator style={{ borderColor: 'var(--color-grey-100)' }} />}

                <ListItem key={booking.id} data={booking} />
              </>
            )}
          </For>
        )}
      </List.Root>
    </DashboardBox>
  );
};

export default TodayGuestsActivity;
