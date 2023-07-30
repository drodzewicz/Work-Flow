import { TagDTO } from "../types/dto/index.js";
import { TagDocument } from "../types/database/index.js";

export const TagMapper = (data: TagDocument): TagDTO => {
  if (!data) {
    return null;
  }
  return {
    _id: data._id.toString(),
    name: data.name,
    key: data.key,
  };
};
