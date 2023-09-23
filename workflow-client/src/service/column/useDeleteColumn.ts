import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

type DeleteColumnProps = { boardId: string; onSuccess?: () => void };

const useDeleteColumn = (props: DeleteColumnProps) => {
  const client = useAuthClient();
  return useMutation<AxiosResponse, unknown, string>(
    (columnId) => client.delete(`/boards/${props.boardId}/columns/${columnId}`),
    {
      onSuccess: props.onSuccess,
    }
  );
};

export default useDeleteColumn;
