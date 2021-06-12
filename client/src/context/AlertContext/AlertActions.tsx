import { AlertActionType } from ".";

interface AlertPayload {
  message: string;
}

export interface AlertOpen {
  type: AlertActionType;
  payload: AlertPayload;
}

export interface AlertClose {
  type: AlertActionType;
  payload: AlertPayload;
}

export type AlertActions = AlertOpen | AlertClose;