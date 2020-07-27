import React, { createContext, useReducer } from "react";

export const ModalContext = createContext();

const initialState = { render: "", title: "", show: false }

const reducer = (state, {type, payload}) => {
  switch(type) {
    case "OPEN":
      return { render: payload.render, title: payload.title, show: true };
    case "CLOSE":
      return { render: "", title: "", show: false };
    default:
      return state;
  }
}

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ModalContext.Provider value={[state, dispatch]}>{children}</ModalContext.Provider>;
};