const taskURL = {
  index: "/tasks" as const,
  id: (taskId: string) => `${taskURL.index}/${taskId}` as const,
  read: (taskId: string) => taskURL.id(taskId),
  delete: (taskId: string) => taskURL.id(taskId),
  move: (taskId: string) => `${taskURL.id(taskId)}/move`,
};

export default taskURL;
