import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberURL from "./url";

const useAddBoardMember = () => {
  //   const queryClient = useQueryClient();

  const client = useAuthClient();
  return useMutation<
    AxiosResponse<{ role: string; user: User }>,
    unknown,
    { boardId: string; userId: string }
  >(({ boardId, userId }) => client.post(memberURL.add(boardId, userId)), {
    onSuccess: () => {
      //   queryClient.invalidateQueries("self-pinned-boards");
    },
  });
};

export default useAddBoardMember;
