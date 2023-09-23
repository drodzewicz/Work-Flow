import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import columnURL from "./url";

type DeleteColumnProps = { boardId: string; onSuccess?: () => void };

const useDeleteColumn = ({ boardId, onSuccess }: DeleteColumnProps) => {
  const client = useAuthClient();
  return useMutation<AxiosResponse, unknown, string>(
    (columnId) => client.delete(columnURL.delete(boardId, columnId)),
    {
      onSuccess,
    }
  );
};

export default useDeleteColumn;
