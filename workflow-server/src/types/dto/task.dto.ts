import { UserDTO } from "./user.dto.js";

export interface TaskDTO {
  _id: string;
  title: string;
  description: string;
  author: UserDTO;
  assignees: UserDTO[];
  tags: unknown[];
}

export interface ColumnTaskDTO {
  _id: string;
  name: string;
  tasks: TaskDTO[];
}
