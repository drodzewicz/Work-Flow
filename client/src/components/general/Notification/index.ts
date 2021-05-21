export { default } from "./Notification";

export interface NotificationProps {
  boardTitle: string;
  message:string;
  url?: string;
  removeNotification: () => void;
}