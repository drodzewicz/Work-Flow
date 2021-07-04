import React from "react";
import { PaginationI } from "components/general/Pagination";

export { default } from "./BoardContainer";

export interface BoardContainerProps {
  title: string | React.ReactNode;
  titleIcon?: "pinned" | "board";
  boards: any[];
  isLoading?: boolean;
  togglePinBoard: (boardId: string) => void;
  removeBoard: (boardId: string) => void;
  page?: PaginationI;
  changePage?: (page: number) => void;
  className?: string;
  noBoardsMessage?: string;
}