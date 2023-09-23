import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

type UpdateMemberRoleProps = { boardId: string };

const useUpdateMemberRole = (props: UpdateMemberRoleProps) => {
  const client = useAuthClient();
  return useMutation<AxiosResponse, unknown, { userId: string; role: string }>(({ userId, role }) =>
    client.patch(`/boards/${props.boardId}/members/${userId}/role`, { role })
  );
};

export default useUpdateMemberRole;
