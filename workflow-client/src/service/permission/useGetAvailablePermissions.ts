import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";
import permissionURL from "./url";

const useGetAvailablePermissions = () => {
  const client = useAuthClient();
  return useQuery<AxiosResponse<string[]>, unknown, string[]>(
    "permissions",
    () => client.get(permissionURL.permissions),
    {
      select: (response) => response.data,
    }
  );
};

export default useGetAvailablePermissions;
