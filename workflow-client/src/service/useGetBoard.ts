import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

type GetBoardProps = { boardId: string | undefined };
const useGetBoard = ({ boardId }: GetBoardProps) => {
  const client = useAuthClient();
  return useQuery(["board", boardId], () => client.get(`/boards/${boardId}`), {
    select: (response) => response.data,
    enabled: !!boardId,
  });
};

export default useGetBoard;
