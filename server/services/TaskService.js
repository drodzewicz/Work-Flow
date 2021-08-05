module.exports = (TaskRepository) => {
  return {
    getTask: async (taskId) => {
      return await TaskRepository.get(taskId);
    },
    updateTask: async (taskId, taskData) => {
      // TODO give this dtaa some validation maybe
      return await TaskRepository.update(taskId, taskData);
    },
  };
};
