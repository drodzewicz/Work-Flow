import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError, string>, "mutationFn">;

type RemoveBoardProps = { boardId: string } & OptionsType;

const useRemoveBoardMember = ({ boardId, ...options }: RemoveBoardProps) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (userId) => {
    const response = await client.delete(memberURL.remove(boardId, userId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useRemoveBoardMember;
