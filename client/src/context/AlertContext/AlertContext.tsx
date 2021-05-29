import React, { createContext, useReducer, useEffect } from "react";
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

// ReturnType<typeof setTimeout>

export const AlertProvider: React.FC = ({ children }) => {
  // let watingTimeout: ReturnType<typeof setTimeout> | null = null;
  const [alertState, alertDispatch] = useReducer<React.Reducer<AlertState, AlertActions>>(
    reducer,
    initialState
  );
  // TODO
  // - close after 5 sec
  // 
  // useEffect(() => {
  //   const closeAlert = () => {
  //     alertDispatch({ type: AlertActionType.CLOSE });
  //   };
  //   if (alertState.show && watingTimeout == null) {
  //     watingTimeout = setTimeout(closeAlert, 5000);
  //   } else clearTimeout(watingTimeout);
  //   return () => {
  //     clearTimeout(watingTimeout);
  //   };
  // }, [alertState.show]);

  return (
    <AlertContext.Provider value={{ alertState, alertDispatch }}>
      {children}
    </AlertContext.Provider>
  );
};
