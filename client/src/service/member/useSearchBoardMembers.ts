import { useState } from "react";

import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberQueryKeys from "./queryKeys";
import memberURL from "./url";

export type UserListPaginated = { totalCount: number; members: { role: string; user: User }[] };

type UserListQueryKey = ReturnType<(typeof memberQueryKeys)["searchListPaginated"]>;

type OptionsType<R> = Omit<
  UseQueryOptions<UserListPaginated, AxiosError, R, UserListQueryKey>,
  "queryKey" | "queryFn"
>;

type SearchBoardMembersProps<R> = {
  limit?: number;
  page?: number;
  boardId: string;
} & OptionsType<R>;

function useSearchBoardMembers<R = UserListPaginated>({
  boardId,
  limit: propsLimit,
  page: propPage,
  ...options
}: SearchBoardMembersProps<R>) {
  const limit = propsLimit ?? 5;
  const page = propPage ?? 1;

  const client = useAuthClient();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchMembersList: QueryFunction<UserListPaginated, UserListQueryKey> = async ({
    queryKey: [{ listId, searchTerm }],
  }) => {
    const response = await client.get(memberURL.index(listId), {
      params: { page: page, limit, username: searchTerm },
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
}

export default useSearchBoardMembers;
