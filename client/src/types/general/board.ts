import { TagColors } from "./constants";
import { User, BoardUserI } from "./user";

export interface TagI {
  _id: string;
  color: TagColors;
  name: string;
}

export interface TaskI {
  _id: string;
  title: string;
  description: string;
  author: string;
  people: User[];
  tags: TagI[];
}

export interface TaskI2 {
  _id: string;
  title: string;
  description: string;
  author: User;
  people: User[];
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

export interface TaskI {
  _id: string;
  title: string;
  description: string;
  author: string;
  board: string;
  people: User[];
  tags: TagI[];
}
