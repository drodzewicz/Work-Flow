import { AuthAction } from "./actions";

export type AuthState = {
  user: User | null;
  token: string | null;
};

export interface LoginSuccessAction {
  type: AuthAction.LOGIN;
  payload: {
    token: string;
    user: User;
  };
}

export interface LogoutAction {
  type: AuthAction.LOGOUT;
}

export type AuthActionType = LoginSuccessAction | LogoutAction;
