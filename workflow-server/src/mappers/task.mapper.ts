import { TaskDTO, ColumnTaskDTO } from "../types/dto/index.js";
import { TaskDocument, UserDocument, ColumnDocument } from "../types/database/index.js";
import { UserMapper, TagMapper } from "./index.js";

export const TaskMapper = (data: TaskDocument): TaskDTO => {
  if (!data) {
    return null;
  }
  return {
    _id: data._id.toString(),
    author: UserMapper(data.author as UserDocument),
    description: data.description,
    title: data.title,
    assignees: data.assignees.map(UserMapper),
    tags: data.tags.map(TagMapper),
  };
};

export const ColumnTaskMapper = (data: ColumnDocument): ColumnTaskDTO => {
  if (!data) {
    return null;
  }
  return {
    _id: data._id.toString(),
    name: data.name,
    tasks: data.tasks.map(TaskMapper),
  };
};
