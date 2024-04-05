import { AuthAction } from "./actions";

export type AuthState = {
    user?: User;
    token?: string;
};

export interface LoginSuccessAction {
    type: AuthAction.LOGIN;
    payload: AuthState;
}

export interface LogoutAction {
    type: AuthAction.LOGOUT;
}

export type AuthActionType = LoginSuccessAction | LogoutAction;
