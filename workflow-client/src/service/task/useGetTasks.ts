import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import taskURL from "./url";

type GetColumnTasksProp = {
  boardId: string;
  columnId?: string;
  onSuccess?: (data: ColumnWithTasks | ColumnWithTasks[]) => void;
};

const boardTasksKey = ({ boardId, columnId }: { boardId: string; columnId?: string }) => [
  "board",
  boardId,
  "column",
  columnId,
];

const useGetTasks = (props: GetColumnTasksProp) => {
  const client = useAuthClient();
  return useQuery<
    AxiosResponse<ColumnWithTasks | ColumnWithTasks[]>,
    unknown,
    ColumnWithTasks | ColumnWithTasks[]
  >(
    boardTasksKey({ boardId: props.boardId, columnId: props.columnId }),
    () =>
      client.get(taskURL.index, { params: { boardId: props.boardId, columnId: props.columnId } }),
    {
      select: (response) => response.data,
      onSuccess: (data) => {
        props?.onSuccess?.(data);
      },
    }
  );
};

export { boardTasksKey };

export default useGetTasks;
