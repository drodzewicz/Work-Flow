import { AlertTypes } from "components/general/Alert";

export enum AlertActionType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
  CLOSE = "CLOSE",
}

export type AlertState = { type: AlertTypes; message: string; show: boolean };

export * from "./AlertContext";
