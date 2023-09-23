import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import permissionURL from "./url";

type UpdateMemberRoleProps = { boardId: string };

const useUpdateMemberRole = ({ boardId }: UpdateMemberRoleProps) => {
  const client = useAuthClient();
  return useMutation<AxiosResponse, unknown, { userId: string; role: string }>(({ userId, role }) =>
    client.patch(permissionURL.updateMemberRole(boardId, userId), { role })
  );
};

export default useUpdateMemberRole;
