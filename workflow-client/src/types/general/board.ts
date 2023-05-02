import { TagColors } from "./constants";
import { UserShortI, BoardUserI } from "./user";

export interface TagI {
  _id: string;
  color: TagColors;
  name: string;
}

export interface TaskI {
  _id: string;
  title: string;
  description: string;
  author: UserShortI;
  people: UserShortI[];
  tags: TagI[];
}

export interface ColumnI {
  _id: string;
  name: string;
  tasks: TaskI[];
}

export interface BoardFullI {
  _id: string;
  name: string;
  description: string;
  author: string;
  columns: ColumnI[];
}

export interface BoardI {
  _id: string;
  name: string;
  description: string;
  author: string;
  isAuthor: boolean;
  pinned?: boolean;
  members?: BoardUserI[];
}
