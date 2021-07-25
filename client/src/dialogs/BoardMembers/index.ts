import { UserShortI, UserBoardRoles } from "types/general";

export { default } from "./BoardMembers";

export interface BoardMembersProps {
  boardId: string;
}

export interface SearchedUser extends UserShortI {
  text: string;
}

export interface Member {
  user: UserShortI;
  role: UserBoardRoles;
}
