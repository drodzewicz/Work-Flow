export { default } from "./BoardCard";

export interface BoardcardProps {
  boardName: string;
  boardId: string;
  isPinned?: boolean;
  pinBoard: () => void;
  removeBoard: (boardId: string) => void;
  isAuthor?: boolean;
}