import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

type AddNewColumnProps = { boardId: string };

const useAddNewColumn = (props: AddNewColumnProps) => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<Column>, unknown, string>(
    (name) => client.post(`/boards/${props.boardId}/columns`, { name }),
    {
      onSuccess: () => queryClient.invalidateQueries(["board", props.boardId]),
    }
  );
};

export default useAddNewColumn;
