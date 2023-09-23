import { AxiosError } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type PinnendBoardsQueryKey = ReturnType<(typeof selfQueryKeys)["pinnedBoards"]>;

// TODO: use useFetchUserBoards with parameter pinned instead of a seperate endpoint
const useGetUserPinnedBoards = () => {
  const client = useAuthClient();

  const fetchPinnedBoards = async () => {
    const response = await client.get(selfURL.pinnedBards());
    return response.data;
  };

  return useQuery<Board[], AxiosError, Board[], PinnendBoardsQueryKey>({
    queryKey: selfQueryKeys.pinnedBoards(),
    queryFn: fetchPinnedBoards,
  });
};

export default useGetUserPinnedBoards;
