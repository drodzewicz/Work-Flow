const permissionsQueryKeys = {
    all: [{ scope: "permissions" }] as const,
    board: (boardId: string) =>
        [{ ...permissionsQueryKeys.all[0], entity: "list", listId: boardId }] as const,
    boardUser: (boardId: string, userId: string) =>
        [{ ...permissionsQueryKeys.all[0], entity: "item", id: { boardId, userId } }] as const,
};

export default permissionsQueryKeys;
