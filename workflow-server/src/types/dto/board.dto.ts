export interface BoardDTO {
  _id: string;
  timeCreated: Date;
  name: string;
  description: string;
  columns: { _id: string; name: string }[];
}

export interface BoardSimpleDTO {
  _id: string;
  timeCreated: Date;
  name: string;
  description: string;
}

export interface ColumnSimpleDTO {
  name: string;
  _id: string;
}
