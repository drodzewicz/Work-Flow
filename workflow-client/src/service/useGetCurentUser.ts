import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useClient from "@/hooks/useClient";

type GetCurrentUserProps = { onSuccess?: (data: User) => void };

const useGetCurrentUser = (props?: GetCurrentUserProps) => {
  const client = useClient();
  return useQuery<AxiosResponse<User>, unknown, User>("user-self", () => client.get("/self"), {
    select: (response) => response.data,
    onSuccess: props?.onSuccess,
  });
};

export default useGetCurrentUser;
