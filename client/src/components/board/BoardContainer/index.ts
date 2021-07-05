import React from "react";
import { BoardI } from "types";
import { PaginationI } from "components/general/Pagination";

export { default } from "./BoardContainer";

export interface BoardContainerProps {
  title: string | React.ReactNode;
  titleIcon?: "pinned" | "board";
  boards: BoardI[];
  isLoading?: boolean;
  togglePinBoard: (boardId: string) => void;
  removeBoard: (boardId: string) => void;
  page?: PaginationI;
  changePage?: (page: number) => void;
  className?: string;
  noBoardsMessage?: string;
}