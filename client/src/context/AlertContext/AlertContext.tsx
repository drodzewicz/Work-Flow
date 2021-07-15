import React, { createContext, useReducer, useEffect, useRef } from "react";
import { AlertActionType, AlertState } from ".";
import { AlertActions } from "./AlertActions";
import { Warning } from "components/general/WarningNotification";

const initialState: AlertState = { type: Warning.SUCCESS, message: "", show: false };

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
      return { type: Warning.SUCCESS, message: action.payload.message, show: true };
    case AlertActionType.WARNING:
      return { type: Warning.WARNING, message: action.payload.message, show: true };
    case AlertActionType.ERROR:
      return { type: Warning.ERROR, message: action.payload.message, show: true };
    case AlertActionType.CLOSE:
      return { ...state, show: false };
    default:
      return state;
  }
};

export const AlertProvider: React.FC = ({ children }) => {
  let watingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    } else if (watingTimeout.current) clearTimeout(watingTimeout.current);

    return () => {
      if (watingTimeout.current) clearTimeout(watingTimeout.current);
    };
  }, [alertState.show]);

  return (
    <AlertContext.Provider value={{ alertState, alertDispatch }}>{children}</AlertContext.Provider>
  );
};
