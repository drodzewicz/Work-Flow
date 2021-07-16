import React, { createContext, Reducer, useReducer } from "react";
import { ModalActionType, ModalSizeType } from ".";
import { ModalActions } from "./ModalActions";

type ModalState = { render: any; title: string; show: boolean; size: ModalSizeType };

const initialState: ModalState = { render: null, title: "", show: false, size: "m" };

export const ModalContext = createContext<{
  modalState: ModalState;
  modalDispatch: React.Dispatch<ModalActions>;
}>({
  modalState: initialState,
  modalDispatch: () => undefined,
});

const reducer: Reducer<ModalState, ModalActions> = (state, action): ModalState => {
  switch (action.type) {
    case ModalActionType.OPEN:
      return {
        render: action.payload.render,
        title: action.payload.title,
        show: true,
        size: action.payload.size || "m",
      };
    case ModalActionType.CLOSE:
      return { render: null, title: "", show: false, size: "m" };
    default:
      return state;
  }
};

export const ModalProvider: React.FC = ({ children }) => {
  const [modalState, modalDispatch] = useReducer<Reducer<ModalState, ModalActions>>(
    reducer,
    initialState
  );

  return (
    <ModalContext.Provider value={{ modalState, modalDispatch }}>{children}</ModalContext.Provider>
  );
};
