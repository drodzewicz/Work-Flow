import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

type BoardResponse = {
  _id: string;
  timeCreated: string;
  name: string;
  description: string;
  columns: Column[];
};

type GetBoardProps = { boardId: string | undefined };
const useGetBoard = ({ boardId }: GetBoardProps) => {
  const client = useAuthClient();
  return useQuery<AxiosResponse<BoardResponse>, unknown, BoardResponse>(
    ["board", boardId],
    () => client.get(`/boards/${boardId}`),
    {
      select: (response) => response.data,
      enabled: !!boardId,
    }
  );
};

export default useGetBoard;
