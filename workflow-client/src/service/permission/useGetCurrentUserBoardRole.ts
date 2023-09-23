import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuth from "@/hooks/useAuth";
import useAuthClient from "@/hooks/useClient";

type GetCurrentUserBoardRoleProps = {
  boardId: string;
};

type PermissionsReposne = {
  role: string;
  permissions: string[];
};

const useGetCurrentUserBoardRole = ({ boardId }: GetCurrentUserBoardRoleProps) => {
  const { user } = useAuth();
  const client = useAuthClient();

  return useQuery<AxiosResponse<PermissionsReposne>, unknown, PermissionsReposne>(
    ["board-self-permissions"],
    () => client.get(`/boards/${boardId}/permissions/${user?._id}`),
    {
      staleTime: 1000 * 60 * 1,
      select: (response) => response.data,
    }
  );
};

export default useGetCurrentUserBoardRole;
