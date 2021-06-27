export interface User {
  _id: string;
  username: string;
  avatarImageURL?: string;
}

export enum UserBoardRoles {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  REGULAR = "REGULAR",
  GUEST = "GUEST",
}
