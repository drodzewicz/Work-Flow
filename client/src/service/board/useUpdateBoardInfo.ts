import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import { boardQueryKeys } from ".";
import boardURL from "./url";

type UpdateBoardInfoPayload = { name: string; description?: string };

type OptionsType = Omit<
  UseMutationOptions<Board, AxiosError<GenericAPIError>, UpdateBoardInfoPayload>,
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
      toast.success("Board updated");
      queryClient.invalidateQueries(boardQueryKeys.item(boardId));
      options?.onSuccess?.(_data, _var, _context);
    },
    onError: (data, _var, _context) => {
      const errorMessage =
        data.response?.data.message || "There was an issue while trying to update a board";
      toast.error(errorMessage);
      options?.onError?.(data, _var, _context);
    },
  });
};

export default useUpdateBoardInfo;
