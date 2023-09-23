import { AxiosError } from "axios";
import { useQuery } from "react-query";

import useClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type GetCurrentUserProps = { onSuccess?: (data: User) => void };

type CurrentUserQueryKey = ReturnType<(typeof selfQueryKeys)["currentUser"]>;

const useGetCurrentUser = (props?: GetCurrentUserProps) => {
  const client = useClient();

  const fetchCurrentUser = async () => {
    const response = await client.get(selfURL.index);
    return response.data;
  };

  return useQuery<User, AxiosError, User, CurrentUserQueryKey>({
    queryKey: selfQueryKeys.currentUser(),
    queryFn: fetchCurrentUser,
    onSuccess: props?.onSuccess,
  });
};

export default useGetCurrentUser;
