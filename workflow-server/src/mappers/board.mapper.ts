import { BoardDTO, BoardSimpleDTO, ColumnSimpleDTO } from "../types/dto/index.js";
import { BoardDocument, ColumnDocument } from "../types/database/index.js";

export const BoardMapper = (data: BoardDocument): BoardDTO => {
  if (!data) {
    return null;
  }
  return {
    _id: data._id.toString(),
    timeCreated: data.timeCreated,
    name: data.name,
    description: data.description,
    columns: data.columns.map(({ _id, name }) => ({ _id: _id.toString(), name })),
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

export const ColumnSimpleMapper = (data: ColumnDocument): ColumnSimpleDTO => {
  if (!data) {
    return null;
  }
  return {
    _id: data._id.toString(),
    name: data.name,
  };
};
