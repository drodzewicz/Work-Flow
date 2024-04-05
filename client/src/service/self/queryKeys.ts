const selfQueryKeys = {
    all: [{ scope: "self" }] as const,
    currentUser: () => [{ ...selfQueryKeys.all[0], resource: "currentUser" }] as const,
    notifications: () => [{ ...selfQueryKeys.all[0], resource: "notification" }] as const,
    boards: () => [{ ...selfQueryKeys.all[0], resource: "boards" }] as const,
    paginatedBoards: (pagination?: { page: number; limit: number }) =>
        [{ ...selfQueryKeys.boards()[0], pagination }] as const,
    pinnedBoards: () => [{ ...selfQueryKeys.boards()[0], variant: "pinned" }] as const,
};

export default selfQueryKeys;
