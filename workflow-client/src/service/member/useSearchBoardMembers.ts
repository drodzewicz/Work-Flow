import { useState } from "react";

import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberQueryKeys from "./queryKeys";
import memberURL from "./url";

type UserListPaginated = { totalCount: number; members: { role: string; user: User }[] };

type UserListQueryKey = ReturnType<(typeof memberQueryKeys)["searchListPaginated"]>;

type OptionsType = Omit<
  UseQueryOptions<UserListPaginated, AxiosError, UserListPaginated, UserListQueryKey>,
  "queryKey" | "queryFn"
>;

type SearchBoardMembersProps = {
  limit?: number;
  page?: number;
  boardId: string;
} & OptionsType;

const useSearchBoardMembers = ({
  boardId,
  limit: propsLimit,
  page: propPage,
  ...options
}: SearchBoardMembersProps) => {
  const limit = propsLimit ?? 5;
  const page = propPage ?? 1;

  const client = useAuthClient();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchMembersList: QueryFunction<UserListPaginated, UserListQueryKey> = async ({
    queryKey: [{ listId }],
  }) => {
    const response = await client.get(memberURL.index(listId), {
      params: { page: page, limit, username: searchTerm || undefined },
    });
    return response.data;
  };

  const query = useQuery({
    ...options,
    queryKey: memberQueryKeys.searchListPaginated(boardId, { limit, page }, searchTerm),
    queryFn: fetchMembersList,
    staleTime: 60 * 1000,
  });

  const search = (searchString: string) => {
    setSearchTerm(searchString);
  };

  const clear = () => {
    setSearchTerm("");
  };

  return { ...query, search, clear, searchTerm };
};

export default useSearchBoardMembers;
