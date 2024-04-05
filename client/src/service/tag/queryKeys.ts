const tagQueryKeys = {
    all: [{ scope: "tag" }] as const,
    list: (boardId: string) =>
        [{ ...tagQueryKeys.all[0], entity: "list", listId: { boardId } }] as const,
    item: (id: string) => [{ ...tagQueryKeys.all[0], entity: "item", id }] as const,
};

export default tagQueryKeys;
