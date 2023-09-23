import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useClient from "@/hooks/useClient";

import selfURL from "./url";

type GetCurrentUserProps = { onSuccess?: (data: User) => void };

const useGetCurrentUser = (props?: GetCurrentUserProps) => {
  const client = useClient();
  return useQuery<AxiosResponse<User>, unknown, User>(
    "user-self",
    () => client.get(selfURL.index),
    {
      select: (response) => response.data,
      onSuccess: props?.onSuccess,
    }
  );
};

export default useGetCurrentUser;
