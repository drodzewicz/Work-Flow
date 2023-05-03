import { UserBoardRoles } from "@/types/general";

import { BoardMemberActions } from "../types";

export interface UserInfoProps extends BoardMemberActions {
  userId: string;
  currentRole: UserBoardRoles;
}
