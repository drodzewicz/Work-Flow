export type CreateBoardPayload = {
  name: string;
  description?: string;
};

export type UpdateBoardPayload = {
  name?: string;
  description?: string;
};
