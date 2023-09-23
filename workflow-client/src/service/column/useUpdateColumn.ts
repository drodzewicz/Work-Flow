import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

type UpdateColumnProps = {
  boardId: string;
  columnId: string;
};

const useUpdateColumn = ({ boardId, columnId }: UpdateColumnProps) => {
  const client = useAuthClient();
  return useMutation<AxiosResponse, unknown, string>((name) =>
    client.put(`/boards/${boardId}/columns/${columnId}`, { name })
  );
};

export default useUpdateColumn;
