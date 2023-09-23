import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import boardURL from "./url";

type DeleteBoardProps = {
  onSuceess?: (response: AxiosResponse) => void;
  onError?: (error: unknown) => void;
};

const useDeleteBoard = (props?: DeleteBoardProps) => {
  const client = useAuthClient();
  return useMutation<AxiosResponse, unknown, string>(
    (boardId) => client.delete(boardURL.delete(boardId)),
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

export default useDeleteBoard;
