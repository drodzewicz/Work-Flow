import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

const useTogglePinBoard = () => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  const pinBoardMutation = useMutation(
    (boardId: string) => client.put(`/self/pinnedBoards/${boardId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("self-pinned-boards");
      },
    }
  );
  return pinBoardMutation;
};

export default useTogglePinBoard;
