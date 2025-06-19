import { updateAccount } from "@/services/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateAccountFormType } from "./UpdateAccountForm";
import { UserDataRes } from "@/types/authTypes";

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: ({
      values,
      avatarPath,
    }: {
      values: UpdateAccountFormType;
      avatarPath: string | undefined;
    }) => updateAccount(values, avatarPath),

    onSuccess(res: UserDataRes) {
      queryClient.setQueryData(["user"], res);
    },
  });

  return { mutate, isPending };
};
