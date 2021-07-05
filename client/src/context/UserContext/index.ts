
export * from "./UserContext";

export type AuthStatus = "success" | "failed" | null;

export enum UserActionType {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  ROLE = "ROLE",
  UPDATE_AVATAR = "UPDATE_AVATAR",
}

export type UserState = {
  authStatus: AuthStatus;
  user: any | null;
  currentBoard: { role: string | null; id: string | null };
};