export { default } from "./UserManager";
import { User } from "types";

export interface UserManagerProps {
  users: User[];
  setUsers: (newState: any) => void;
  boardId: string;
}