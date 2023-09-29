import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberQueryKeys from "./queryKeys";
import memberURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError, string>, "mutationFn">;

type RemoveBoardProps = { boardId: string } & OptionsType;

const useRemoveBoardMember = ({ boardId, ...options }: RemoveBoardProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (userId) => {
    const response = await client.delete(memberURL.remove(boardId, userId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      queryClient.invalidateQueries(memberQueryKeys.list(boardId));
      options?.onSuccess?.(_data, _var, _context);
    },
  });
};

export default useRemoveBoardMember;
