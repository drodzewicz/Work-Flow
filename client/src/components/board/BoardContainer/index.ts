import { BoardI } from "types/general";
import { PaginationI } from "components/general/Pagination";

export { default } from "./BoardContainer";

export interface BoardContainerProps {
  boards: BoardI[];
  togglePinBoard: (boardId: string) => void;
  removeBoard: (boardId: string) => void;
  page?: PaginationI;
  changePage?: (page: number) => void;
  className?: string;
  noBoardsMessage?: string;
}