import { User, UserBoardRoles } from "types";

export { default } from "./BoardMembers";

export interface BoardMembersProps {
  boardId: string;
}

export interface SearchedUser extends User {
  text: string;
}

export interface Member {
  user: User;
  role: UserBoardRoles;
}
