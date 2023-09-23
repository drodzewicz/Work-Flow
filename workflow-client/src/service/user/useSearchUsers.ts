import { useState } from "react";

import { AxiosError } from "axios";
import { QueryFunctionContext, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import userQueryKeys from "./queryKeys";
import userURL from "./url";

type SearchUsersProps = { limit?: number; page?: number };

type UserListPaginated = { totalCount: number; users: User[] };

type UserQueryKey = ReturnType<(typeof userQueryKeys)["list"]>;

const useSearchUsers = (props?: SearchUsersProps) => {
  const limit = props?.limit ?? 5;
  const page = props?.page ?? 1;

  const client = useAuthClient();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchTasks = async ({
    queryKey: [{ searchTerm, pagination }],
  }: QueryFunctionContext<UserQueryKey>) => {
    const response = await client.get(userURL.index, {
      params: { ...pagination, username: searchTerm },
    });
    return response.data;
  };

  const query = useQuery<UserListPaginated, AxiosError, UserListPaginated, UserQueryKey>({
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
