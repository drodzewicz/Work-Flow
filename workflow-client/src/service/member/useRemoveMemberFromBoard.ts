import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

type RemoveUserFromBoardPayload = { boardId: string; userId: string };

const useRemoveUserFromBoard = () => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, unknown, RemoveUserFromBoardPayload>(
    ({ boardId, userId }) => client.delete(`/boards/${boardId}/members/${userId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["board-memebers"]);
      },
    }
  );
};

export default useRemoveUserFromBoard;
