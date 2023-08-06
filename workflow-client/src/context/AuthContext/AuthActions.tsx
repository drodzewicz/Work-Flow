import { AuthActionType } from ".";

export interface LoginSuccessAction {
  type: AuthActionType.LOGIN;
  payload: {
    token: string;
    user: any;
  };
}

export interface LogoutAction {
  type: AuthActionType.LOGOUT;
}

export type AuthAction = LoginSuccessAction | LogoutAction;
