import React, { createContext, useReducer, useEffect, useRef } from "react";
import { AlertActionType, AlertState } from ".";
import { AlertActions } from "./AlertActions";
import { AlertTypes } from "@/components/general/Alert";

const initialState: AlertState = { type: AlertTypes.SUCCESS, message: "", show: false };

export const AlertContext = createContext<{
  alertState: AlertState;
  alertDispatch: React.Dispatch<AlertActions>;
}>({
  alertState: initialState,
  alertDispatch: () => undefined,
});

const reducer: React.Reducer<AlertState, AlertActions> = (state, action): AlertState => {
  switch (action.type) {
    case AlertActionType.SUCCESS:
      return { type: AlertTypes.SUCCESS, message: action.payload.message, show: true };
    case AlertActionType.WARNING:
      return { type: AlertTypes.WARNING, message: action.payload.message, show: true };
    case AlertActionType.ERROR:
      return { type: AlertTypes.ERROR, message: action.payload.message, show: true };
    case AlertActionType.CLOSE:
      return { ...state, show: false };
    default:
      return state;
  }
};

export const AlertProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const watingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [alertState, alertDispatch] = useReducer<React.Reducer<AlertState, AlertActions>>(
    reducer,
    initialState
  );
  useEffect(() => {
    const closeAlert = () => {
      alertDispatch({ type: AlertActionType.CLOSE });
    };
    if (alertState.show && watingTimeout.current == null) {
      watingTimeout.current = setTimeout(closeAlert, 5000);
    } else if (watingTimeout.current) {
      clearTimeout(watingTimeout.current);
      watingTimeout.current = null;
    }

    return () => {
      if (watingTimeout.current) clearTimeout(watingTimeout.current);
      watingTimeout.current = null;
    };
  }, [alertState.show]);

  return (
    <AlertContext.Provider value={{ alertState, alertDispatch }}>{children}</AlertContext.Provider>
  );
};
