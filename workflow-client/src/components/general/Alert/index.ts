export { default } from "./Alert";

export enum AlertTypes {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
}

export interface AlertProps {
  message: string;
  type: AlertTypes;
  show: boolean;
}