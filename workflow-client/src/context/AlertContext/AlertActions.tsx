import { AlertActionType } from ".";

interface AlertPayload {
  message: string;
}

export interface AlertOpen {
  type: AlertActionType.SUCCESS | AlertActionType.WARNING | AlertActionType.ERROR;
  payload: AlertPayload;
}

export interface AlertClose {
  type: AlertActionType.CLOSE;
}

export type AlertActions = AlertOpen | AlertClose;