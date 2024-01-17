import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type PinnendBoardsQueryKey = ReturnType<(typeof selfQueryKeys)["pinnedBoards"]>;

type OptionsType = Omit<
  UseQueryOptions<Board[], AxiosError, Board[], PinnendBoardsQueryKey>,
  "queryKey" | "queryFn"
>;

// TODO: use useFetchUserBoards with parameter pinned instead of a seperate endpoint
const useGetUserPinnedBoards = (options?: OptionsType) => {
  const client = useAuthClient();

  const fetchPinnedBoards: QueryFunction<Board[], PinnendBoardsQueryKey> = async () => {
    const response = await client.get(selfURL.pinnedBards());
    return response.data;
  };

  return useQuery({
    ...options,
    queryKey: selfQueryKeys.pinnedBoards(),
    queryFn: fetchPinnedBoards,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetUserPinnedBoards;
