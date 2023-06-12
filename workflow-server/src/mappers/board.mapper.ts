import { BoardDTO, BoardSimpleDTO } from "../types/dto/board.dto.js";
import { BoardDocument } from "../types/database/board.type.js";

export const BoardMapper = (data: BoardDocument): BoardDTO => {
  if (!data) {
    return null;
  }
  return {
    _id: data._id.toString(),
    timeCreated: data.timeCreated,
    name: data.name,
    description: data.description,
    columns: data.columns.map(({ _id, name }) => ({ _id, name })),
  };
};

export const BoardSimpleViewMapper = (data: BoardDocument): BoardSimpleDTO => {
  if (!data) {
    return null;
  }
  return {
    _id: data._id.toString(),
    timeCreated: data.timeCreated,
    name: data.name,
    description: data.description,
  };
};
