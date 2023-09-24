import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import permissionURL from "./url";

type UpdateMemberRolePayload = { userId: string; role: string };

type OptionsType = Omit<
  UseMutationOptions<Board, AxiosError, UpdateMemberRolePayload>,
  "mutationFn"
>;

type UpdateMemberRoleProps = { boardId: string } & OptionsType;

const useUpdateMemberRole = ({ boardId, ...options }: UpdateMemberRoleProps) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<Board, UpdateMemberRolePayload> = async ({ userId, role }) => {
    const response = await client.patch(permissionURL.updateMemberRole(boardId, userId), { role });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useUpdateMemberRole;
