import fetchData, { serviceParams } from "./utils/fetchData";

// NOTIFICATION - GET
export const getNotifications = async ({ setLoading }: serviceParams = {}) => {
  return await fetchData({
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
export const removeNotification = async ({
  setLoading,
  notificationId,
}: removeNotificationParams) => {
  return await fetchData({
    url: `/notification/${notificationId}`,
    token: true,
    method: "DELETE",
    setLoading,
  });
};