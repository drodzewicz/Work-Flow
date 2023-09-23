import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberURL from "./url";

type RemoveBoardMemberPayload = { boardId: string; userId: string };

const useRemoveBoardMember = () => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, unknown, RemoveBoardMemberPayload>(
    ({ boardId, userId }) => client.delete(memberURL.remove(boardId, userId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["board-memebers"]);
      },
    }
  );
};

export default useRemoveBoardMember;
