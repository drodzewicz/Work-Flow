const memberQueryKeys = {
  all: [{ scope: "members" }] as const,
  list: (boardId: string, pagination: { page: number; limit: number }) =>
    [{ ...memberQueryKeys.all[0], entity: "list", listId: boardId, pagination }] as const,
};

export default memberQueryKeys;
