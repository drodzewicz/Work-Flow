import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import boardURL from "./url";

type LeaveBoardProps = {
  onSuceess?: (response: AxiosResponse) => void;
  onError?: (error: unknown) => void;
};

const useLeaveBoard = (props?: LeaveBoardProps) => {
  const client = useAuthClient();
  return useMutation<AxiosResponse, unknown, string>(
    (boardId) => client.patch(boardURL.leave(boardId)),
    {
      onSuccess: (response) => {
        props?.onSuceess?.(response);
      },
      onError: (error) => {
        props?.onError?.(error);
      },
    }
  );
};

export default useLeaveBoard;
