import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import columnURL from "./url";

type CreateColumnProps = { boardId: string };

const useCreateColumn = ({ boardId }: CreateColumnProps) => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<Column>, unknown, string>(
    (name) => client.post(columnURL.index(boardId), { name }),
    {
      onSuccess: () => queryClient.invalidateQueries(["board", boardId]),
    }
  );
};

export default useCreateColumn;
