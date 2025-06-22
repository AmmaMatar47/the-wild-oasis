import DeleteDialog from '@/components/DeleteDialog';
import Heading from '@/components/Heading';
import StatusBadge from '@/components/StatusBadge';
import { checkOut, deleteBooking, getBookingById } from '@/services/api/bookingsApi';
import { Flex, Strong } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import BookingsDetailsBox from '../features/bookings/BookingsDetailsBox';
import SectionHeader from '@/components/SectionHeader';
import BackButton from '@/components/BackButton';
import PageError from '@/components/PageError';
import { BookingDetailsType } from '@/types/bookingsTypes';
import Button from '@/components/Button';
import Skeleton from '@/components/Skeleton';
import BookingsDetailsBoxSkeleton from '../features/bookings/BookingsDetailsBoxSkeleton';

const BookingsDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bookingsId = Number(params.bookingsId);
  const [booking, setBooking] = useState<BookingDetailsType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        const bookingRes = await getBookingById(bookingsId);
        setBooking(bookingRes[0]);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [bookingsId]);

  const handleGoBack = () => navigate(-1);

  const handleToggleDeleteDialog = () => setIsDeleteOpen(open => !open);

  const handleDeleteBooking = () => {
    deleteBooking(bookingsId).then(() => {
      setIsDeleteOpen(open => !open);
      handleGoBack();
    });
  };

  const handleCheckOut = () => {
    checkOut(bookingsId);
  };

  return booking === undefined && !isLoading ? (
    <PageError message='Failed to load booking details' />
  ) : (
    <>
      <SectionHeader>
        <Flex alignItems='center' gap='4'>
          <Heading>Booking #{bookingsId} </Heading>
          <Skeleton loading={isLoading}>
            {booking && <StatusBadge status={booking.status}>{booking.status}</StatusBadge>}
          </Skeleton>
        </Flex>
        <BackButton />
      </SectionHeader>

      {isLoading || booking === undefined ? (
        <BookingsDetailsBoxSkeleton />
      ) : (
        <BookingsDetailsBox booking={booking} />
      )}

      <Flex justifyContent='end' gap='4'>
        {booking && booking.status === 'unconfirmed' && (
          <Button asChild disabled={isLoading}>
            <Link to={`/checkin/${booking.id}`}>Check in</Link>
          </Button>
        )}
        {booking && booking.status === 'checked-in' && (
          <Button onClick={handleCheckOut}>Check out</Button>
        )}
        <Button
          color='#fff'
          bgColor='var(--color-red-700)'
          _hover={{ bgColor: 'var(--color-red-800)' }}
          onClick={handleToggleDeleteDialog}
          disabled={isLoading}
        >
          Delete Booking
        </Button>
      </Flex>
      <DeleteDialog
        title='Delete booking'
        onDelete={handleDeleteBooking}
        open={isDeleteOpen}
        onOpenChange={handleToggleDeleteDialog}
      >
        Are you sure you want to delete{' '}
        <Strong color='var(--color-grey-700)' fontWeight='500'>
          {booking && booking.guests.fullName}'s
        </Strong>{' '}
        booking? It will be permanently deleted, and this action cannot be undone.{' '}
      </DeleteDialog>
    </>
  );
};

export default BookingsDetails;
