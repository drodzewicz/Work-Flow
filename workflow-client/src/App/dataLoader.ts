import { isUserAuthenticated } from "@/service";

export const loader = async () => {
  const { data, status } = await isUserAuthenticated();
  console.log("IN LOADER", status)
  return { user: data?.user, authorized: data?.authorized || !(status === 401) };
};
