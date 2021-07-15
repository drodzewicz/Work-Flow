export { default } from "./UserManager";
import { UserShortI } from "types/general";

export interface UserManagerProps {
  users: UserShortI[];
  setUsers: (newState: any) => void;
  boardId: string;
}