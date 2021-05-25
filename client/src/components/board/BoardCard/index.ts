export { default } from "./BoardCard";

export interface BoardcardProps {
  boardInfo: {
    name: string;
    description: string;
    members: any[];
  };
  boardId: string;
  isPinned?: boolean;
  pinBoard: () => void;
  removeBoard: () => void;
  isAuthor?: boolean;
}