import React, { useReducer, createContext } from "react";

import authReducer from "./reducer";
import { AuthActionType, AuthState } from "./type";

const INITIAL_STATE: AuthState = {
  user: null,
  token: null,
};

export const AuthContext = createContext<[AuthState, React.Dispatch<AuthActionType>]>([
  INITIAL_STATE,
  () => null,
]);

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
};
