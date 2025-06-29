import { checkout as checkoutRequest } from '@/services/api/bookingsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationKey: ['bookings'],
    mutationFn: (id: number) => checkoutRequest(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  return { checkout, isCheckingOut };
};
