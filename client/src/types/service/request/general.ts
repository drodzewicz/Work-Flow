import { CancelToken } from "axios";

export interface serviceParams {
  setLoading?: (state: boolean) => void;
  cancelToken?: CancelToken
}

export interface socketServiceParams {
  res?: (response: any) => void;
}