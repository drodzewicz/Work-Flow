import { useQuery } from "react-query";

import useAuth from "@/hooks/useAuth";
import useAuthClient from "@/hooks/useClient";

type GetUserBoardPermissionsProps = { boardId: string };

const useGetUserBoardPermissions = ({ boardId }: GetUserBoardPermissionsProps) => {
  const client = useAuthClient();
  const { user } = useAuth();
  return useQuery(
    ["board-user-permissions", user.id],
    () => client.get(`/boards/${boardId}/permissions/${user._id}`),
    {
      select: (response) => response.data,
    }
  );
};

export default useGetUserBoardPermissions;
