const TaskService = require("../services/TaskService");
const mockBoardRepository = require("./mocks/repositories/mockBoardRepository");
const mockNotificationRepository = require("./mocks/repositories/mockNotificationRepository");
const mockTaskRepository = require("./mocks/repositories/mockTaskRepository");
const mockDatabase = require("./mocks/data");

describe("TASK", () => {
  let taskService;
  let BoardRepository;
  let TaskRepository;
  let NotificationRepository;

  beforeEach(() => {
    BoardRepository = mockBoardRepository();
    TaskRepository = mockTaskRepository();
    NotificationRepository = mockNotificationRepository();

    taskService = TaskService({
      BoardRepository,
      TaskRepository,
      NotificationRepository,
    });
  });

  describe("CREATE TASK", () => {
    it("should create a task", async () => {
      await taskService.createBoardTask("board_id", "column_id", { title: "some task" });
      expect(TaskRepository.create).toHaveBeenCalled();
    });

    it("should send notfications about the task to all assined people", async () => {
      await taskService.createBoardTask("board_id", "column_id", { title: "some task" });
      expect(NotificationRepository.addNotificationToManyUsers).toHaveBeenCalled();
      const notification = NotificationRepository.addNotificationToManyUsers.mock.calls[0][1];
      expect(notification).toHaveProperty("title");
      expect(notification).toHaveProperty("info");
      expect(notification).toHaveProperty("url");
    });
  });

  describe("DELETE TASK", () => {
    it("should remove task from board column", async () => {
      const taskToBeDeleted = mockDatabase.tasks[1]._id;

      await taskService.deleteTask("board_id", taskToBeDeleted);
      const { columns } = BoardRepository.save.mock.calls[0][0];
      columns.forEach((column) => {
        column.tasks.forEach((task) => {
          expect(task._id).not.toBe(taskToBeDeleted);
        });
      });
    });

    it("should delete task", async () => {
      const taskToBeDeleted = mockDatabase.tasks[0]._id;
      await taskService.deleteTask("board_id", taskToBeDeleted);
      expect(TaskRepository.delete).toHaveBeenCalledWith(taskToBeDeleted);
    });
  });

  describe("MOVE TASK", () => {
    const boardId = "board_id";
    const source = { columnIndex: 0, taskIndex: 0 };
    const destination = { columnIndex: 1, taskIndex: 1 };
    const observingTask =
      mockDatabase.fullBoard.columns[source.columnIndex].tasks[source.taskIndex];

    it("should move task from one column to another", async () => {
      await taskService.moveTask(boardId, source, destination);
      const { columns } = BoardRepository.save.mock.calls[0][0];
      expect(
        columns[source.columnIndex].tasks.find(({ _id }) => _id === observingTask._id)
      ).toBeFalsy();
      expect(
        columns[destination.columnIndex].tasks.find(({ _id }) => _id === observingTask._id)
      ).toBeTruthy();
    });

    it("should change task index in the column", async () => {
      await taskService.moveTask(boardId, source, destination);
      const { columns } = BoardRepository.save.mock.calls[0][0];
      expect(columns[source.columnIndex].tasks[source.taskIndex]._id).not.toBe(observingTask._id);
      expect(columns[destination.columnIndex].tasks[destination.taskIndex]._id).toBe(
        observingTask._id
      );
    });
  });
});
