const tagURL = {
    index: "/tags" as const,
    id: (taskId: string) => `${tagURL.index}/${taskId}` as const,
    read: (taskId: string) => tagURL.id(taskId),
    delete: (taskId: string) => tagURL.id(taskId),
    update: (taskId: string) => tagURL.id(taskId),
};

export default tagURL;
