import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [renderComp, setRenderComp] = useState({
    render: "",
    show: false,
  });

  return <ModalContext.Provider value={[renderComp, setRenderComp]}>{children}</ModalContext.Provider>;
};