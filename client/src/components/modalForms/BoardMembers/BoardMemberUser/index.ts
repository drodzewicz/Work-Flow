export { default } from "./BoardMemberUser";
import { Member } from "../"
import { UserBoardRoles } from "types";

export interface BoardMembersUserProps {
  member: Member;
  removeUser: (userId: string) => void;
  changeUserRole: (userId: string, newRole: UserBoardRoles) => void;
}