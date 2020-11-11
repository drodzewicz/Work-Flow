import React, { createContext, useReducer, useEffect } from "react";

export const WarningNotificationContext = createContext();

const initialState = { type: "SUCCESS", message: "", show: false }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SUCCESS":
      return { type: "SUCCESS", message: payload.message, show: true };
    case "WARNING":
      return { type: "WARNING", message: payload.message, show: true };
    case "ERROR":
      return { type: "ERROR", message: payload.message, show: true };
    case "CLOSE":
      return { ...state, show: false };
    default:
      return state;
  }
}

export const WarningNotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const closeNotification = () => {
      dispatch({ type: "CLOSE" })
    }
    if(state.show) setTimeout(closeNotification, 5000);
    else clearTimeout(closeNotification);
    return () => {
      clearTimeout(closeNotification)
    }
  }, [state.show])

  return <WarningNotificationContext.Provider value={[state, dispatch]}>{children}</WarningNotificationContext.Provider>;
};