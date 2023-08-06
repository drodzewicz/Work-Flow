import React, { useReducer, Reducer, createContext } from "react";

import { AuthActionType } from ".";
import { AuthState } from ".";
import { AuthAction } from "./AuthActions";

const initialState: AuthState = {
  user: null,
  token: null,
};

export const AuthContext = createContext<{
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
}>({
  authState: initialState,
  authDispatch: () => undefined,
});

const reducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case AuthActionType.LOGIN: {
      return { ...state, user: action.payload.user, token: action.payload.token }
    }
    case AuthActionType.LOGOUT:
      return { user: null, token: null };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>{children}</AuthContext.Provider>
  );
};
