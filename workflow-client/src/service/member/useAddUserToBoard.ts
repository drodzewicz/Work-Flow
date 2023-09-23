import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

const useAddUserToBoard = () => {
  //   const queryClient = useQueryClient();

  const client = useAuthClient();
  return useMutation<
    AxiosResponse<{ role: string; user: User }>,
    unknown,
    { boardId: string; userId: string }
  >(({ boardId, userId }) => client.post(`/boards/${boardId}/members/${userId}`), {
    onSuccess: () => {
      //   queryClient.invalidateQueries("self-pinned-boards");
    },
  });
};

export default useAddUserToBoard;
