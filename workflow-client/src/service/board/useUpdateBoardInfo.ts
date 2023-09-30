import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import { boardQueryKeys } from ".";
import boardURL from "./url";

type UpdateBoardInfoPayload = { name: string; description?: string };

type OptionsType = Omit<
  UseMutationOptions<Board, AxiosError, UpdateBoardInfoPayload>,
  "mutationFn"
>;

type UpdateBoardInfoProps = { boardId: string } & OptionsType;

const useUpdateBoardInfo = ({ boardId, ...options }: UpdateBoardInfoProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<Board, UpdateBoardInfoPayload> = async (data) => {
    const response = await client.put(boardURL.update(boardId), data);
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      queryClient.invalidateQueries(boardQueryKeys.item(boardId));
      options?.onSuccess?.(_data, _var, _context);
    },
  });
};

export default useUpdateBoardInfo;
