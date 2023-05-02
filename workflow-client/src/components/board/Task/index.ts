import { UserShortI, TagI } from "types/general";

export { default } from "./Task";

export interface TaskProps {
  taskId: string;
  title: string;
  indexes: {
    taskIndex: number;
    columnIndex: number;
  };
  tags?: TagI[];
  people?: UserShortI[];
}
