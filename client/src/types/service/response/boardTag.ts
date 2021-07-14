import { TagI } from "types/general";

export interface getBoardTagsResponse {
  tags: TagI[];
}

export interface createBoardTagResponse {
  message: string;
  tag: TagI;
}

export interface updateBoardTagsResponse {
  message: string;
  tag: TagI;
}
