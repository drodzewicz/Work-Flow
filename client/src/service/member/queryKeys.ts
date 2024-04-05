const memberQueryKeys = {
    all: [{ scope: "members" }] as const,
    list: (boardId: string) =>
        [{ ...memberQueryKeys.all[0], entity: "list", listId: boardId }] as const,
    listPaginated: (boardId: string, pagination: { page: number; limit: number }) =>
        [{ ...memberQueryKeys.list(boardId)[0], pagination }] as const,
    searchListPaginated: (
        boardId: string,
        pagination: { page: number; limit: number },
        searchTerm: string
    ) => [{ ...memberQueryKeys.listPaginated(boardId, pagination)[0], searchTerm }] as const,
};

export default memberQueryKeys;
