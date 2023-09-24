import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberURL from "./url";

type UserRoleResponse = { role: string; user: User };

type OptionsType = Omit<UseMutationOptions<UserRoleResponse, AxiosError, string>, "mutationFn">;

type AddBoardMemberProps = { boardId: string } & OptionsType;

const useAddBoardMember = ({ boardId, ...options }: AddBoardMemberProps) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<UserRoleResponse, string> = async (userId) => {
    const response = await client.post(memberURL.add(boardId, userId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useAddBoardMember;
