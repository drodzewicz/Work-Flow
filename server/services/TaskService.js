module.exports = function ({ TaskRepository, BoardRepository, NotificationRepository }) {
  async function createBoardTask(boardId, columnId, taskData) {
    const newTask = await TaskRepository.create(taskData);
    await TaskRepository.addTaskToColumn(boardId, columnId, newTask._id);

    const foundBoard = await BoardRepository.get(boardId);
    const columnIndex = foundBoard.columns.findIndex(
      (col) => col._id.toLocaleString() === columnId.toLocaleString()
    );

    const notification = {
      title: foundBoard.name,
      info: `assigned new task: ${newTask.title}`,
      url: `/board/${foundBoard._id}?task=${newTask._id}`,
    };
    if (newTask.people.length > 0) {
      await NotificationRepository.addNotificationToManyUsers(newTask.people, notification);
    }
    const task = await TaskRepository.get(newTask._id);
    return { columnIndex, task };
  }

  async function deleteTask(boardId, taskId) {
    const foundBoard = await BoardRepository.get(boardId);

    let columnIndex = -1;
    let taskIndex = -1;
    
    for (let col in foundBoard.columns) {
      for (let task in foundBoard.columns[col].tasks) {
        if (foundBoard.columns[col].tasks[task]._id.toLocaleString() === taskId.toLocaleString()) {
          columnIndex = col;
          taskIndex = task;
          break;
        }
      }
      if (columnIndex >= 0 && taskIndex >= 0) break;
    }
    
    foundBoard.columns[columnIndex].tasks.splice(taskIndex, 1);
    
    await BoardRepository.save(foundBoard);
    await TaskRepository.delete(taskId);

    return { columnIndex, taskIndex };
  }

  async function moveTask(boardId, source, destination) {
    const foundBoard = await BoardRepository.get(boardId);
    const movingTask = foundBoard.columns[source.columnIndex].tasks.splice(source.taskIndex, 1)[0];
    foundBoard.columns[destination.columnIndex].tasks.splice(destination.taskIndex, 0, movingTask);
    await BoardRepository.save(foundBoard);
  }

  async function getTask(taskId) {
    return await TaskRepository.get(taskId);
  }
  
  async function updateTask(taskId, taskData) {
    return await TaskRepository.update(taskId, taskData);
  }
  return {
    createBoardTask,
    deleteTask,
    moveTask,
    getTask,
    updateTask,
  };
};
