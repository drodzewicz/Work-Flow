import { Warning } from "components/general/WarningNotification"

export enum AlertActionType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
  CLOSE = "CLOSE",
}

export type AlertState = { type: Warning; message: string; show: boolean };

export * from "./AlertContext";
