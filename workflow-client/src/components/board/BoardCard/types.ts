export interface BoardcardProps {
  boardName: string;
  boardId: string;
  isPinned?: boolean;
  pinBoard: () => void;
  isAuthor?: boolean;
}
