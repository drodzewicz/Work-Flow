import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

type GetBoardRolesProps = { boardId: string };

type BoardRole = Record<string, { permissions: string[] }>;

const useGetBoardRoles = ({ boardId }: GetBoardRolesProps) => {
  const client = useAuthClient();
  return useQuery<AxiosResponse<BoardRole>, unknown, BoardRole>(
    ["board-roles", boardId],
    () => client.get(`/boards/${boardId}/roles`),
    {
      select: (response) => response.data,
    }
  );
};

export default useGetBoardRoles;
