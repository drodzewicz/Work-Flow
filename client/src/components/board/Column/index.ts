export { default } from "./Column";
import { TaskI } from "types/general";

export interface ColumnProps {
  columnName: string;
  columnId: string;
  columnIndex: number;
  boardId: string;
  listOfTasks: TaskI[];
}


