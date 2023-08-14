import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

type FetchColumnTasksProp = {
  boardId: string;
  columnId?: string;
  onSuccess?: (data: ColumnWithTasks | ColumnWithTasks[]) => void;
};

const useFetchTasks = (props: FetchColumnTasksProp) => {
  const client = useAuthClient();
  return useQuery<
    AxiosResponse<ColumnWithTasks | ColumnWithTasks[]>,
    unknown,
    ColumnWithTasks | ColumnWithTasks[]
  >(
    ["board", props.boardId, "column", props.columnId],
    () => client.get("/tasks", { params: { boardId: props.boardId, columnId: props.columnId } }),
    {
      select: (response) => response.data,
      onSuccess: (data) => {
        props?.onSuccess?.(data);
      },
    }
  );
};

export default useFetchTasks;
