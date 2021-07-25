export { default } from "./Tags";

export enum TagColors {
  RED = "RED",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
  TIEL = "TIEL",
  PURPLE = "PURPLE",
  MAJENTA = "MAJENTA",
  PINK = "PINK",
  BLACK = "BLACK",
  WHITE = "WHITE",
}

export interface TagsProps {
  boardId: string;
}
