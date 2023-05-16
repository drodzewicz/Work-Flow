import { UserBoardRoles } from "@/types/general";

export * from "./UserContext";

export enum UserActionType {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  ROLE = "ROLE",
  UPDATE_AVATAR = "UPDATE_AVATAR",
}

export type UserState = {
  authenticated: boolean | null;
  user: any | null;
  currentBoard: { role: UserBoardRoles | null; id: string | null };
};
