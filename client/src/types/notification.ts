export type NotificationKeyType =
  | "board.deleted"
  | "board.user.added"
  | "board.user.removed"
  | "board.user.role"
  | "task.assignee.added"
  | "task.deleted";

export const NotificationKey: Record<string, NotificationKeyType> = {
  DELETE_BOARD: "board.deleted",
  ADD_USER_TO_BOARD: "board.user.added",
  REMOVE_USER_FROM_BOARD: "board.user.removed",
  MODIFY_USER_ROLE: "board.user.role",
  ASSIGN_USER_TO_TASK: "task.assignee.added",
  DELETE_TASK: "task.deleted",
};
