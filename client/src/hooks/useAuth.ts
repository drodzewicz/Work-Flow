import { useContext, useDebugValue } from "react";

import { AuthContext, AuthAction } from "@/context/AuthContext";

type Logintype = { user: User; token?: string } | { user?: User; token: string };

const useAuth = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const { user, token } = authState;
  const userFromLocaleStorage = localStorage.getItem("user");
  const parsedUser: User | undefined = userFromLocaleStorage
    ? JSON.parse(userFromLocaleStorage)
    : null;

  useDebugValue(authState, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  const login = ({ user, token }: Logintype) => {
    authDispatch({ type: AuthAction.LOGIN, payload: { user, token } });
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const logout = () => {
    authDispatch({ type: AuthAction.LOGOUT });
    localStorage.removeItem("user");
  };

  return { user: user ?? parsedUser, token, login, logout };
};

export { useAuth };

export default useAuth;
