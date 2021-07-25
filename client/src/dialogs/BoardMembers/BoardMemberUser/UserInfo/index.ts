import { UserBoardRoles } from "types/general";
import { BoardMemberActions } from "..";

export { default } from "./UserInfo";

export interface UserInfoProps extends BoardMemberActions {
  userId: string;
  currentRole: UserBoardRoles;
}
