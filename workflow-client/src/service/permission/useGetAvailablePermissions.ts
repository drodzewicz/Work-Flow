import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

const useGetAvailablePermissions = () => {
  const client = useAuthClient();
  return useQuery<AxiosResponse<string[]>, unknown, string[]>(
    "permissions",
    () => client.get("/permissions"),
    {
      select: (response) => response.data,
    }
  );
};

export default useGetAvailablePermissions;
