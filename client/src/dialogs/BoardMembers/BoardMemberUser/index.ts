export { default } from "./BoardMemberUser";
import { Member } from ".."
import { UserBoardRoles } from "types/general";

export interface BoardMemberActions {
  removeUser: (userId: string) => void;
  changeUserRole: (userId: string, newRole: UserBoardRoles) => void;
}

export interface BoardMembersUserProps extends BoardMemberActions {
  member: Member;
}