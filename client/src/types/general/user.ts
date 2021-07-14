import { UserBoardRoles } from "./constants";

export interface User {
  _id: string;
  username: string;
  avatarImageURL?: string;
}

export interface BoardUserI {
  role: UserBoardRoles;
  user: User;
}
