export interface serviceParams {
  setLoading?: (state: boolean) => void;
}

export interface socketServiceParams {
  res?: (response: any) => void;
}