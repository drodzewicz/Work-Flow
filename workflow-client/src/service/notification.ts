import callAPI from "./utils/fetchData";
import { removeNotificationParams } from "@/types/service/request";
import { serviceParams } from "@/types/service/request";
import { getNotificationsResponse, GeneralResponse} from "@/types/service/response";

// NOTIFICATION - GET

export const getNotifications = async ({  ...serviceProps }: serviceParams = {}) => {
  return await callAPI<getNotificationsResponse>({
    url: "/notification",
    token: true,
    method: "GET",
    ...serviceProps
  });
};

// NOTIFICATION - DELETE
export const removeNotification = async ({
  notificationId,
  ...serviceProps
}: removeNotificationParams) => {
  return await callAPI<GeneralResponse>({
    url: `/notification/${notificationId}`,
    token: true,
    method: "DELETE",
    ...serviceProps,
  });
};