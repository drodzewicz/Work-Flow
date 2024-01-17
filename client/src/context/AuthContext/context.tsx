import React, { useReducer, createContext, PropsWithChildren } from "react";

import authReducer from "./reducer";
import { AuthActionType, AuthState } from "./type";

const INITIAL_STATE: AuthState = {
  user: undefined,
  token: undefined,
};

export const AuthContext = createContext<[AuthState, React.Dispatch<AuthActionType>]>([
  INITIAL_STATE,
  () => null,
]);

type AuthContextType = {
  initialValues?: AuthState;
};

export const AuthProvider: React.FC<PropsWithChildren<AuthContextType>> = ({
  children,
  initialValues = INITIAL_STATE,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialValues);

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
};
