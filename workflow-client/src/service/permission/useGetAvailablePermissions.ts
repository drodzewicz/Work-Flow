import { AxiosError } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import permissionURL from "./url";

const useGetAvailablePermissions = () => {
  const client = useAuthClient();

  const fetchPermissions = async () => {
    const response = await client.get(permissionURL.permissions);
    return response.data;
  };

  return useQuery<string[], AxiosError, string[]>({
    queryKey: "permissions",
    queryFn: fetchPermissions,
  });
};

export default useGetAvailablePermissions;
