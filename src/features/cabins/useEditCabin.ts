import { editCabin } from "@/services/api/cabinsApi";
import { CabinType } from "@/types/cabinsTypes";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending: isEditing } = useMutation({
    mutationKey: ["cabins"],
    mutationFn: ({
      cabinId,
      values,
      bucketName,
      imagePath,
    }: {
      cabinId: number | string;
      values: CabinType;
      bucketName?: string;
      imagePath?: string;
    }) => editCabin(cabinId, values, bucketName, imagePath),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cabins"], type: "active" });
    },
  });

  return { mutate, isEditing };
};
