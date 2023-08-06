import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

type GetBoardMembersProps = {
  boardId: string;
  page: number;
  limit: number;
  onSuccess?: (data: PaginatedBoardMembersList) => void;
};

type PaginatedBoardMembersList = { members: BoradMember[]; totalCount: number };

const useGetBoardMembers = ({ boardId, page, limit, onSuccess }: GetBoardMembersProps) => {
  const client = useAuthClient();
  return useQuery<AxiosResponse<PaginatedBoardMembersList>, unknown, PaginatedBoardMembersList>(
    ["board-memebers", boardId, page],
    () => client.get(`boards/${boardId}/members`, { params: { page: page, limit } }),
    {
      select: (response) => response.data,
      onSuccess,
    }
  );
};

export default useGetBoardMembers;
