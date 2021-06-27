export { default } from "./BoardMemberUser";
import { Member } from "../"

export interface BoardMembersUserProps {
  member: Member;
  removeUser: (userId: string) => void;
  changeUserRole: (userId: string, newRole: any) => void;
}