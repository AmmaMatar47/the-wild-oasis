import { getCabins } from '@/services/api/cabinsApi';
import { getDataRange } from '@/services/api/indexApi';
import { CABINS_PAGE_SIZE } from '@/utils/constants';
import { calculatePageRange } from '@/utils/helper';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export const useCabins = () => {
  const [searchParams] = useSearchParams();
  const activePage = Number(searchParams?.get('page')) || 1;
  const sortingValue = searchParams?.get('order') || 'name.asc';
  const activeSegment = searchParams?.get('discount') || 'All';

  const [cabinsCount, setCabinsCount] = useState(0);

  const {
    data: cabins,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['cabins', activePage, sortingValue, activeSegment],
    queryFn: () =>
      getCabins(sortingValue, activeSegment, calculatePageRange(activePage, CABINS_PAGE_SIZE)),
  });

  useEffect(() => {
    const getCabinsCount = async () => {
      const count = await getDataRange(
        'cabins',
        activeSegment === 'All' ? null : { discount: activeSegment }
      );
      setCabinsCount(count);
    };
    getCabinsCount();
  }, [activeSegment, cabins]);

  return { cabins, isLoading, cabinsCount, refetch, error };
};
