import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

type CreateBoardProps = {
  onSuccess?: (data: AxiosResponse<Board>) => void;
};

type BoardPayload = {
  name: string;
  description?: string;
};

const useCreateBoard = ({ onSuccess }: CreateBoardProps) => {
  const client = useAuthClient();
  const createBoardMutation = useMutation<AxiosResponse<Board>, unknown, BoardPayload>(
    (data) => client.post("/boards/", data),
    {
      onSuccess,
    }
  );

  return createBoardMutation;
};

export default useCreateBoard;
