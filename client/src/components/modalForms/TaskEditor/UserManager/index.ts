export { default } from "./UserManager";

export interface UserManagerProps {
  users: any[];
  setUsers: (newState: any) => void;
  boardId: string;
}