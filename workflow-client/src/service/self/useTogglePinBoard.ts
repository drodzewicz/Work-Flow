import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfURL from "./url";

const useTogglePinBoard = () => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  const pinBoardMutation = useMutation(
    (boardId: string) => client.put(selfURL.togglePin(boardId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("self-pinned-boards");
      },
    }
  );
  return pinBoardMutation;
};

export default useTogglePinBoard;
