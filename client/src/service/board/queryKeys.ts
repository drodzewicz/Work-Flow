const boardQueryKeys = {
    all: [{ scope: "board" }] as const,
    item: (id: string) => [{ ...boardQueryKeys.all[0], entity: "item", id }] as const,
};

export default boardQueryKeys;
