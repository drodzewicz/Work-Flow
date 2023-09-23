import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfURL from "./url";

// TODO: use useFetchUserBoards with parameter pinned instead of a seperate endpoint
const useGetUserPinnedBoards = () => {
  const client = useAuthClient();
  const pinneBoardQuery = useQuery<AxiosResponse<Board[]>, unknown, Board[]>(
    ["self-pinned-boards"],
    () => client.get(selfURL.pinnedBards()),
    {
      select(data) {
        return data.data;
      },
    }
  );
  return pinneBoardQuery;
};

export default useGetUserPinnedBoards;
