const userQueryKeys = {
  all: [{ scope: "user" }] as const,
  list: (searchTerm?: string, pagination?: { page: number; limit: number }) =>
    [{ ...userQueryKeys.all[0], entity: "list", searchTerm, pagination }] as const,
};

export default userQueryKeys;
