import callAPI, { serviceParams } from "./utils/fetchData";
import { NotificationI } from "types";

// NOTIFICATION - GET
interface getNotificationsResponse {
  notifications: NotificationI[];
}
export const getNotifications = async ({ setLoading }: serviceParams = {}) => {
  return await callAPI<getNotificationsResponse>({
    url: "/notification",
    token: true,
    method: "GET",
    setLoading,
  });
};

// NOTIFICATION - DELETE
interface removeNotificationParams extends serviceParams {
  notificationId: string;
}
interface removeNotificationResponse {
  message: string;
}
export const removeNotification = async ({
  setLoading,
  notificationId,
}: removeNotificationParams) => {
  return await callAPI<removeNotificationResponse>({
    url: `/notification/${notificationId}`,
    token: true,
    method: "DELETE",
    setLoading,
  });
};