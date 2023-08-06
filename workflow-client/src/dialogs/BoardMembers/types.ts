import { UserShortI, UserBoardRoles } from "@/types/general";

export interface BoardMembersProps {
  boardId: string;
}

export interface SearchedUser extends UserShortI {
  text: string;
}

export interface Member {
  user: User;
  role: string;
}
