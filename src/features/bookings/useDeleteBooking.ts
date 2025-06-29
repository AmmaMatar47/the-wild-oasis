import { deleteBooking as deleteBookingRequest } from "@/services/api/bookingsApi";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: (bookingId: number) => deleteBookingRequest(bookingId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  return { deleteBooking, isPending };
};
