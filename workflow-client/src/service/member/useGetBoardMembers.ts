import { AxiosError } from "axios";
import { QueryFunctionContext, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberQueryKeys from "./queryKeys";
import memberURL from "./url";

type GetBoardMembersProps = {
  boardId: string;
  page: number;
  limit: number;
  onSuccess?: (data: PaginatedBoardMembersList) => void;
};

type PaginatedBoardMembersList = { members: BoradMember[]; totalCount: number };

type MemberListQueryKey = ReturnType<(typeof memberQueryKeys)["list"]>;

const useGetBoardMembers = ({ boardId, page, limit, onSuccess }: GetBoardMembersProps) => {
  const client = useAuthClient();

  const fetchMembersList = async ({
    queryKey: [{ listId, pagination }],
  }: QueryFunctionContext<MemberListQueryKey>) => {
    const response = await client.get(memberURL.index(listId), { params: pagination });
    return response.data;
  };

  return useQuery<
    PaginatedBoardMembersList,
    AxiosError,
    PaginatedBoardMembersList,
    MemberListQueryKey
  >({
    queryKey: memberQueryKeys.list(boardId, { page, limit }),
    queryFn: fetchMembersList,
    onSuccess,
  });
};

export default useGetBoardMembers;
