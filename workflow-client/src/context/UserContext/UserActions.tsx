import { UserActionType } from ".";

export interface LoginSuccessAction {
  type: UserActionType.LOGIN_SUCCESS;
  payload: {
    token?: string;
    user: any;
  };
}

export interface LoginFailAction {
  type: UserActionType.LOGIN_FAIL;
}

export interface LogoutAction {
  type: UserActionType.LOGOUT;
}

export interface BoardRoleAction {
  type: UserActionType.ROLE;
  payload: {
    role: string;
    boardId: string;
  };
}

export interface UpdateAvatarAction {
  type: UserActionType.UPDATE_AVATAR;
  payload: {
    avatar: string;
  };
}

export type UserAction =
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
  | BoardRoleAction
  | UpdateAvatarAction;
