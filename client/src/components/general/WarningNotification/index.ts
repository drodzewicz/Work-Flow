export { default } from "./WarningNotification";

export enum Warning {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING"
}

export interface WarningNotificationProps {
  message: string;
  type: Warning;
  show: boolean;
}