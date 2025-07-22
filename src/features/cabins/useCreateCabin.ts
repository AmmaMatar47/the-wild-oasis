import { createCabin } from '@/services/api/cabinsApi';
import { CabinType } from '@/types/cabinsTypes';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['cabins'],
    mutationFn: ({ cabinData, bucketName }: { cabinData: CabinType; bucketName?: string }) =>
      createCabin(cabinData, bucketName),

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
  });

  return { mutate, isPending };
};
