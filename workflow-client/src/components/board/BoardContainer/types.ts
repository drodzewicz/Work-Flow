import { PaginationI } from "@/components/general/Pagination/types";

export interface BoardContainerProps {
  boards: (Board & { isPinned: boolean })[];
  togglePinBoard: (boardId: string) => void;
  page?: PaginationI;
  changePage?: (page: number) => void;
  className?: string;
  noBoardsMessage?: string;
  numberOfLoadingItems: number;
  isLoading?: boolean
}
