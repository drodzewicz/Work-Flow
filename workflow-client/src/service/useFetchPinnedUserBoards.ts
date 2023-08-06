import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

const useFetchPinnedUserBoards = () => {
  const client = useAuthClient();
  const pinneBoardQuery = useQuery<AxiosResponse<Board[]>, unknown, Board[]>(
    ["self-pinned-boards"],
    () => client.get("/self/pinnedBoards"),
    {
      select(data) {
        return data.data;
      },
    }
  );
  return pinneBoardQuery;
};

export default useFetchPinnedUserBoards;
