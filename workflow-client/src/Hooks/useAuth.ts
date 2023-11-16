import { useContext, useDebugValue } from "react";

import { AuthContext, AuthAction } from "@/context/AuthContext";

const useAuth = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const { user, token } = authState;
  const userFromLocaleStorage = localStorage.getItem("user");
  const parsedUser: User | null = userFromLocaleStorage ? JSON.parse(userFromLocaleStorage) : null;

  useDebugValue(authState, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  const login = ({ user, token }: { user: User; token: string }) => {
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

export default useAuth;
