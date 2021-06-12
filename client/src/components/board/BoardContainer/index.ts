import React from "react";

export { default } from "./BoardContainer";

export interface BoardContainerProps {
  title: string | React.ReactNode;
  boards: any[];
  isLoading?: boolean;
  togglePinBoard: (index: number) => void;
  removeBoard: (boardId: string) => void;
  page?: {
      amountOfPages: number;
      currentPage: number;
  };
  changePage?: (page: number) => void;
  className?: string;
  noBoardsMessage?: string;
}