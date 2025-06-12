import Heading from '@/components/Heading';
import { List, Separator, For, EmptyState, VStack, BoxProps, SkeletonText } from '@chakra-ui/react';
import { useTodayActivity } from './useTodayActivity';
import ListItem from './ListItem';
import SectionBox from '../../components/SectionBox';

const TodayGuestsActivity = ({ ...props }: BoxProps) => {
  const { activities, isLoading } = useTodayActivity();

  return (
    <SectionBox padding='6' {...props}>
      {isLoading ? (
        <>
          <SkeletonText noOfLines={1} w='7.2rem' h='1.2rem' marginBottom='6' />
          <List.Root overflowY='auto' height='84%'>
            <For each={['', '', '', '', '', '']}>
              {(_, i) => (
                <>
                  {i === 0 ? null : <Separator style={{ borderColor: 'var(--color-grey-100)' }} />}
                  <SkeletonText noOfLines={1} marginY='3' variant='shine' />
                </>
              )}
            </For>
          </List.Root>
        </>
      ) : (
        <>
          <Heading as='h3' fontSize='xl' marginBottom='6'>
            Today
          </Heading>
          <List.Root overflowY='auto' height='84%'>
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
          </List.Root>
        </>
      )}
    </SectionBox>
  );
};

export default TodayGuestsActivity;
