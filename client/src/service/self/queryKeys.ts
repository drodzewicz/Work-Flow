const selfQueryKeys = {
    all: [{ scope: "self" }] as const,
    currentUser: () => [{ ...selfQueryKeys.all[0], resource: "currentUser" }] as const,
    notifications: () => [{ ...selfQueryKeys.all[0], resource: "notification" }] as const,
    boards: () => [{ ...selfQueryKeys.all[0], resource: "boards" }] as const,
    paginatedBoards: (props?: { page: number; limit: number; name?: string }) =>
        [
            {
                ...selfQueryKeys.boards()[0],
                pagination: props ? { page: props?.page, limit: props.limit } : undefined,
                name: props?.name,
            },
        ] as const,
    pinnedBoards: () => [{ ...selfQueryKeys.boards()[0], variant: "pinned" }] as const,
};

export default selfQueryKeys;
