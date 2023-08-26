import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

type SearchBoardMembersProps = {
  limit?: number;
  page?: number;
  boardId: string;
  onSuccess?: (data: UserListPaginated) => void;
  setTotalItems?: (count: number) => void;
};

type UserListPaginated = { totalCount: number; members: { role: string; user: User }[] };

const useSearchBoardMembers = (props?: SearchBoardMembersProps) => {
  const limit = props?.limit ?? 5;
  const page = props?.page ?? 1;
  const boardId = props?.boardId ?? "";

  const client = useAuthClient();
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const query = useQuery<AxiosResponse<UserListPaginated>, unknown, UserListPaginated>(
    ["board-memebers", boardId, page, searchTerm],
    () =>
      client.get(`boards/${boardId}/members`, {
        params: { page: page, limit, username: searchTerm },
      }),
    {
      keepPreviousData: true,
      select: (response) => response.data,
      staleTime: Infinity,
      onSuccess: props?.onSuccess,
    }
  );

  useEffect(() => {
    props?.setTotalItems?.(query.data?.totalCount ?? 0);
  }, [query.data?.totalCount]);

  const search = (searchString: string) => {
    setSearchTerm(searchString);
  };

  const clear = () => {
    setSearchTerm("");
  };

  return { ...query, search, clear, searchTerm };
};

export default useSearchBoardMembers;
