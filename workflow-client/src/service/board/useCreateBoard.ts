import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import boardURL from "./url";

type CreateBoardProps = {
  onSuccess?: (data: AxiosResponse<Board>) => void;
};

type BoardPayload = {
  name: string;
  description?: string;
};

const useCreateBoard = ({ onSuccess }: CreateBoardProps) => {
  const client = useAuthClient();
  const createBoardMutation = useMutation<AxiosResponse<Board>, AxiosError, BoardPayload>(
    (data) => client.post(boardURL.index, data),
    {
      onSuccess,
    }
  );

  return createBoardMutation;
};

export default useCreateBoard;
