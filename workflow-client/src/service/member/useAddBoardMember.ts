import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberQueryKeys from "./queryKeys";
import memberURL from "./url";

type UserRoleResponse = { role: string; user: User };

type OptionsType = Omit<UseMutationOptions<UserRoleResponse, AxiosError, string>, "mutationFn">;

type AddBoardMemberProps = { boardId: string } & OptionsType;

const useAddBoardMember = ({ boardId, ...options }: AddBoardMemberProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<UserRoleResponse, string> = async (userId) => {
    const response = await client.post(memberURL.add(boardId, userId));
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

export default useAddBoardMember;
