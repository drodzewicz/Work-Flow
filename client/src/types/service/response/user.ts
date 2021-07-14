import { User } from "types/general";

export interface fullUserI extends User {
  name: string;
  surname: string;
  email: string;
}
export interface isAuthenticatedResponse {
  authorized: boolean;
  user: fullUserI;
}
export interface loginResponse {
  token: string;
  user: User;
}

export type searchUsersResponse = User[];