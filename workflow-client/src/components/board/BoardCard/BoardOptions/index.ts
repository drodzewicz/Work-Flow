export { default } from "./BoardOptions";

export interface BoardOptionsProps {
  boardId: string;
  removeBoardCallback: (boardId: string) => void;
  isAuthor: boolean;
}