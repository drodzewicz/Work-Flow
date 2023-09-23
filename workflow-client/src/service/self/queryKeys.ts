const selfQueryKeys = {
  all: [{ scope: "self" }] as const,
  currentUser: () => [{ ...selfQueryKeys.all[0], resource: "currentUser" }] as const,
  notifications: () => [{ ...selfQueryKeys.all[0], resource: "notification" }] as const,
  boards: (pagination: { page: number; limit: number }) =>
    [{ ...selfQueryKeys.all[0], resource: "boards", pagination }] as const,
  pinnedBoards: () => [{ ...selfQueryKeys.all[0], resource: "boards-pinned" }] as const,
};

export default selfQueryKeys;
