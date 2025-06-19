import Heading from '@/components/Heading';
import { List, For, EmptyState, VStack, BoxProps, Box } from '@chakra-ui/react';
import { useTodayActivity } from './useTodayActivity';
import TodayActivityListItem from './TodayActivityListItem';
import SectionBox from '../../components/SectionBox';
import Separator from '@/components/Separator';
import SkeletonText from '@/components/SkeletonText';

const TodayGuestsActivity = ({ ...props }: BoxProps) => {
  const { activities, isLoading } = useTodayActivity();

  return (
    <SectionBox padding='6' {...props}>
      {isLoading ? (
        <>
          <SkeletonText noOfLines={1} w='7.2rem' h='1.2rem' marginBottom='6' />
          <List.Root overflowY='auto' height='84%'>
            <For each={new Array(6).fill('')}>
              {(_, i) => (
                <Box key={crypto.randomUUID()}>
                  {i === 0 ? null : <Separator style={{ borderColor: 'var(--color-grey-100)' }} />}
                  <SkeletonText noOfLines={1} marginY='3' variant='shine' />
                </Box>
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
                <Box key={booking.id}>
                  {i === 0 ? null : <Separator />}

                  <TodayActivityListItem data={booking} />
                </Box>
              )}
            </For>
          </List.Root>
        </>
      )}
    </SectionBox>
  );
};

export default TodayGuestsActivity;
