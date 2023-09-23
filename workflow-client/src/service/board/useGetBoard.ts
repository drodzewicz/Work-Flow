import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import boardURL from "./url";

type BoardResponse = {
  _id: string;
  timeCreated: string;
  name: string;
  description: string;
  columns: Column[];
};

type GetBoardProps = { boardId: string; onError?: () => void };

const useGetBoard = ({ boardId, onError }: GetBoardProps) => {
  const client = useAuthClient();
  return useQuery<AxiosResponse<BoardResponse>, unknown, BoardResponse>(
    ["board", boardId],
    () => client.get(boardURL.read(boardId)),
    {
      select: (response) => response.data,
      enabled: !!boardId,
      onError: onError,
    }
  );
};

export default useGetBoard;
