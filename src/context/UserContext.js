import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "Darek",
    theme: false
  });

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};