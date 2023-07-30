export type CreateTaskPayload = {
  title: string;
  description: string;
  boardId: string;
  columnId: string;
};

export type UpdateTaskPayload = {
  title: string;
  description: string;
};

export type MoveTaskPayload = {
  rowIndex: number;
  boardId: string;
  columnId: string;
};
