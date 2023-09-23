import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import boardURL from "./url";

type UpdateBoardInfoProps = { boardId: string };

type UpdateBoardInfoPayload = { name: string; description?: string };

const useUpdateBoardInfo = ({ boardId }: UpdateBoardInfoProps) => {
  const client = useAuthClient();
  return useMutation<AxiosResponse<Board>, unknown, UpdateBoardInfoPayload>((data) =>
    client.put(boardURL.update(boardId), data)
  );
};

export default useUpdateBoardInfo;
