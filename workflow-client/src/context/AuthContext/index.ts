export * from "./AuthContext";

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type User = {
  _id: string;
  username: string;
  surname: string;
  name: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
};

export {};
