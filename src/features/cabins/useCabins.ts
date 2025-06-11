import { getAllCabins } from "@/services/api/cabinsApi";
import { useQuery } from "react-query";

export const useCabins = () => {
  const { data: cabins, isLoading } = useQuery({
    queryFn: () => getAllCabins(),
    queryKey: ["cabins"],
  });

  return { cabins, isLoading };
};
