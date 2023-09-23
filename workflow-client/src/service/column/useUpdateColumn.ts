import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import columnURL from "./url";

type UpdateColumnProps = {
  boardId: string;
  columnId: string;
};

const useUpdateColumn = ({ boardId, columnId }: UpdateColumnProps) => {
  const client = useAuthClient();
  return useMutation<AxiosResponse, unknown, string>((name) =>
    client.put(columnURL.update(boardId, columnId), { name })
  );
};

export default useUpdateColumn;
