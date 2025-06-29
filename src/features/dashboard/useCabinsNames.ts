import { getCabinsNames } from '@/services/api/cabinsApi';
import { useQuery } from '@tanstack/react-query';

export const useCabinsNames = () => {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ['allCabins'],
    queryFn: () => getCabinsNames(),
  });

  return { cabins, isLoading };
};
