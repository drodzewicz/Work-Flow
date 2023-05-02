export { default } from "./Notification";

export interface NotificationProps {
  boardTitle: string;
  message:string;
  url?: string;
  removeNotification: () => void;
}


export interface NotificationResponse {
  info: string,
  title: string,
  url?: string,
  _id: string
}