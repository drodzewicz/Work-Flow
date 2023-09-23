const taskQueryKeys = {
  all: [{ scope: "task" }] as const,
  list: (boardId: string, columnId?: string) =>
    [{ ...taskQueryKeys.all[0], entity: "list", listId: { boardId, columnId } }] as const,
  item: (id: string) => [{ ...taskQueryKeys.all[0], entity: "item", id }] as const,
};

export default taskQueryKeys;
