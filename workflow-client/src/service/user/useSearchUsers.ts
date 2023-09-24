import { useState } from "react";

import { AxiosError } from "axios";
import { QueryFunction, QueryFunctionContext, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import userQueryKeys from "./queryKeys";
import userURL from "./url";

type UserListPaginated = { totalCount: number; users: User[] };

type UserQueryKey = ReturnType<(typeof userQueryKeys)["list"]>;

type OptionsType = Omit<
  UseQueryOptions<UserListPaginated, AxiosError, UserListPaginated, UserQueryKey>,
  "queryKey" | "queryFn"
>;

type SearchUsersProps = { limit: number; page: number } & OptionsType;

const useSearchUsers = ({ limit, page, ...options }: SearchUsersProps) => {
  const client = useAuthClient();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchTasks: QueryFunction<UserListPaginated, UserQueryKey> = async ({
    queryKey: [{ searchTerm, pagination }],
  }) => {
    const response = await client.get(userURL.index, {
      params: { ...pagination, username: searchTerm },
    });
    return response.data;
  };

  const query = useQuery({
    ...options,
    queryKey: userQueryKeys.list(searchTerm, { page, limit }),
    queryFn: fetchTasks,
    enabled: !!searchTerm,
    staleTime: Infinity,
  });

  const search = (searchString: string) => {
    setSearchTerm(searchString);
  };

  const clear = () => {
    setSearchTerm("");
  };

  return { ...query, search, clear };
};

export default useSearchUsers;
