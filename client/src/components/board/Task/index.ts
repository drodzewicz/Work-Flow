import { User, TagI } from "types";

export { default } from "./Task";

export interface TaskProps {
  taskId: string;
  title: string;
  indexes: {
    taskIndex: number;
    columnIndex: number;
  };
  tags?: TagI[];
  people?: User[];
}
