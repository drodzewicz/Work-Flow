import React, { createContext, Reducer, useReducer } from "react";

type ModalState = { render: any; title: string; show: boolean };

const initialState: ModalState = { render: null, title: "", show: false };

export enum ModalActionType {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

export interface OpenModal {
  type: ModalActionType.OPEN;
  payload: {
    title: string;
    render: any;
  };
}

export interface CloseModal {
  type: ModalActionType.CLOSE;
}

export type ModalActions = OpenModal | CloseModal;

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
      return { render: action.payload.render, title: action.payload.title, show: true };
    case ModalActionType.CLOSE:
      return { render: null, title: "", show: false };
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
