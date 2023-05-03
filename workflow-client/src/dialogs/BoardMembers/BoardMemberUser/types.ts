import { UserBoardRoles } from "@/types/general";

import { Member } from "../types";

export interface BoardMemberActions {
  removeUser: (userId: string) => void;
  changeUserRole: (userId: string, newRole: UserBoardRoles) => void;
}

export interface BoardMembersUserProps extends BoardMemberActions {
  member: Member;
}
