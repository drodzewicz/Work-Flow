import { useState } from "react";

import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

type SearchUsersProps = { limit?: number; page?: number };

type UserListPaginated = { totalCount: number; users: User[] };

const useSearchUsers = (props?: SearchUsersProps) => {
  const limit = props?.limit ?? 5;
  const page = props?.page ?? 1;

  const client = useAuthClient();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const query = useQuery<AxiosResponse<UserListPaginated>, unknown, UserListPaginated>(
    ["search-users", searchTerm],
    () => client.get("/users", { params: { limit, page, username: searchTerm } }),
    {
      select: (response) => response.data,
      enabled: !!searchTerm,
      staleTime: Infinity,
    }
  );

  const search = (searchString: string) => {
    setSearchTerm(searchString);
  };

  const clear = () => {
    setSearchTerm("");
  };

  return { ...query, search, clear };
};

export default useSearchUsers;
