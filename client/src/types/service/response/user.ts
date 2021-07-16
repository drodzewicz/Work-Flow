import { UserShortI, UserI } from "types/general";

export interface isAuthenticatedResponse {
  authorized: boolean;
  user: UserI;
}
export interface loginResponse {
  token: string;
  user: UserShortI;
}

export type searchUsersResponse = UserShortI[];