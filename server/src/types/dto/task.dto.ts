import { UserDTO, TagDTO } from "./index.js";

export interface TaskDTO {
    _id: string;
    title: string;
    description: string;
    author: UserDTO;
    assignees: UserDTO[];
    tags: TagDTO[];
}

export interface ColumnTaskDTO {
    _id: string;
    name: string;
    tasks: TaskDTO[];
}
