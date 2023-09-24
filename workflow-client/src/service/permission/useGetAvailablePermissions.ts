import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import permissionURL from "./url";

type PermissionsQueryKey = "permissions";

type OptionsType = Omit<
  UseQueryOptions<string[], AxiosError, string[], PermissionsQueryKey>,
  "queryKey" | "queryFn"
>;

const useGetAvailablePermissions = (options?: OptionsType) => {
  const client = useAuthClient();

  const fetchPermissions: QueryFunction<string[], PermissionsQueryKey> = async () => {
    const response = await client.get(permissionURL.permissions);
    return response.data;
  };

  return useQuery({
    ...options,
    queryKey: "permissions",
    queryFn: fetchPermissions,
  });
};

export default useGetAvailablePermissions;
