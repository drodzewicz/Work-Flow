import callAPI, { serviceParams } from "./utils/fetchData";
import { removeNotificationParams } from "types/service/request";
import { getNotificationsResponse, GeneralResponse} from "types/service/response";

// NOTIFICATION - GET

export const getNotifications = async ({ setLoading }: serviceParams = {}) => {
  return await callAPI<getNotificationsResponse>({
    url: "/notification",
    token: true,
    method: "GET",
    setLoading,
  });
};

// NOTIFICATION - DELETE
export const removeNotification = async ({
  setLoading,
  notificationId,
}: removeNotificationParams) => {
  return await callAPI<GeneralResponse>({
    url: `/notification/${notificationId}`,
    token: true,
    method: "DELETE",
    setLoading,
  });
};