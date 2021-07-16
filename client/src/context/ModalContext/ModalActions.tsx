import { ModalActionType, ModalSizeType } from ".";

export interface OpenModal {
  type: ModalActionType.OPEN;
  payload: {
    title: string;
    render: any;
    size?: ModalSizeType;
  };
}

export interface CloseModal {
  type: ModalActionType.CLOSE;
}

export type ModalActions = OpenModal | CloseModal;
