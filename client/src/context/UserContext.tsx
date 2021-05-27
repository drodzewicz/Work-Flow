import React, { useReducer, Reducer, createContext } from "react";

type AuthStatus = "success" | "failed" | null;

type UserState = {
  authStatus: AuthStatus;
  user: any | null;
  currentBoard: { role: string | null; id: string | null };
};

const initialState: UserState = {
  authStatus: null,
  user: null,
  currentBoard: { role: null, id: null },
};

export enum UserActionType {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  ROLE = "ROLE",
}

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

type UserAction = LoginSuccessAction | LoginFailAction | LogoutAction | BoardRoleAction;

export const UserContext = createContext<{
  userState: UserState;
  userDispatch: React.Dispatch<UserAction>;
}>({
  userState: initialState,
  userDispatch: () => undefined,
});

const reducer: Reducer<UserState, UserAction> = (state, action) => {
  switch (action.type) {
    case UserActionType.LOGIN_SUCCESS:
      !!action.payload.token && localStorage.setItem("token", action.payload.token);
      return { ...state, user: action.payload.user, authStatus: "success" };
    case UserActionType.LOGIN_FAIL:
      localStorage.removeItem("token");
      return { ...state, user: null, authStatus: "failed" };
    case UserActionType.LOGOUT:
      localStorage.removeItem("token");
      return { ...state, user: null, authStatus: null, currentBoard: { role: null, id: null } };
    case UserActionType.ROLE:
      return { ...state, currentBoard: { role: action.payload.role, id: action.payload.boardId } };
    default:
      return state;
  }
};

export const UserProvider: React.FC = ({ children }) => {
  const [userState, userDispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>
  );
};
