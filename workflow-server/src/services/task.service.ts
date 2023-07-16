import { Service, Inject } from "typedi";
import { TaskRepository, UserRepository, BoardRepository } from "../repositories/index.js";
import { TaskMapper, ColumnTaskMapper } from "../mappers/index.js";
import { TaskDTO, ColumnTaskDTO } from "../types/dto/index.js";
import { AuthUser } from "@/types/utils.type.js";
import { HttpError, NotFoundError } from "routing-controllers";

@Service()
export class TaskService {
  taskRepository: TaskRepository;
  userRepository: UserRepository;
  boardRepository: BoardRepository;

  constructor(
    @Inject() taskRepository: TaskRepository,
    @Inject() userRepository: UserRepository,
    @Inject() boardRepository: BoardRepository,
  ) {
    this.taskRepository = taskRepository;
    this.userRepository = userRepository;
    this.boardRepository = boardRepository;
  }

  async createTask(taskData: any, boardId: string, currentUser: AuthUser): Promise<TaskDTO> {
    const author = await this.userRepository.getById(currentUser.id.toString());
    const newTask = { ...taskData, author, board: boardId };
    const task = await this.taskRepository.create(newTask);
    return TaskMapper(task);
  }

  async addTaskToColumn(boardId: string, columnId: string, taskId: string, index?: number): Promise<void> {
    const columnsWithTasks = await this.taskRepository.getBoardTasks(boardId);
    const columnWithTasks = columnsWithTasks.find((column) => column._id.equals(columnId));
    if (!columnWithTasks) {
      throw new NotFoundError("column does not exist");
    }
    await this.taskRepository.addTaskToColumn(taskId, boardId, columnId, index);
  }

  async removeTaskFromColumnBoard(boardId: string, taskId: string): Promise<void> {
    await this.taskRepository.removeTaskFromBoard(taskId, boardId);
  }

  async moveTaskToColumn(taskId: string, boardId: string, columnId: string, rowIndex: number): Promise<void> {
    await this.removeTaskFromColumnBoard(boardId, taskId);
    await this.addTaskToColumn(boardId, columnId, taskId, rowIndex);
  }

  async getAllColumnTasks(boardId: string): Promise<ColumnTaskDTO[]> {
    const columnsWithTasks = await this.taskRepository.getBoardTasks(boardId);

    return columnsWithTasks.map(ColumnTaskMapper);
  }

  async getColumnTasks(boardId: string, columnId: string): Promise<ColumnTaskDTO> {
    const columnsWithTasks = await this.taskRepository.getBoardTasks(boardId);

    const columnWithTasks = columnsWithTasks.find((column) => column._id.equals(columnId));
    if (!columnWithTasks) {
      throw new NotFoundError("Column does not exist");
    }

    return ColumnTaskMapper(columnWithTasks);
  }

  async getTask(taskId: string): Promise<TaskDTO> {
    const task = await this.taskRepository.getById(taskId);
    if (!task) {
      throw new NotFoundError("Task does not exist");
    }
    return TaskMapper(task);
  }

  async getTaskBoardId(taskId: string): Promise<string> {
    const task = await this.taskRepository.getById(taskId);
    if (!task) {
      throw new NotFoundError("Task does not exist");
    }
    return task.board.toString();
  }

  async deleteTask(taskId: string): Promise<void> {
    const task = await this.taskRepository.getById(taskId);
    await this.taskRepository.delete(taskId);
    await this.taskRepository.removeTaskFromBoard(taskId, task.board.toString());
  }

  async updateTask(taskId: string, taskData: any) {
    const task = await this.taskRepository.getById(taskId);
    if (!task) {
      throw new NotFoundError("Task does not exist");
    }
    task.title = taskData.title ?? task.title;
    task.description = taskData.description ?? task.description;
    return await this.taskRepository.save(task);
  }

  async isMemberTaskAssignee(taskId: string, userId: string): Promise<boolean> {
    const task = await this.taskRepository.getById(taskId);
    const assignee = task.assignees.find(({ _id }) => _id.equals(userId));
    return !!assignee;
  }

  async addAssigneeToTask(taskId: string, userId: string): Promise<void> {
    const isAssignee = await this.isMemberTaskAssignee(taskId, userId);
    if (isAssignee) {
      throw new HttpError(400, "User is already assigned to this task");
    }
    await this.taskRepository.addTaskAssignee(taskId, userId);
  }

  async removeAssigneeFromTask(taskId: string, userId: string): Promise<void> {
    const isAssignee = await this.isMemberTaskAssignee(taskId, userId);
    if (!isAssignee) {
      throw new HttpError(400, "User is not assigned to this task");
    }
    await this.taskRepository.removeTaskAssignee(taskId, userId);
  }

  async doesTaskContainTag(taskId: string, tagsId: string): Promise<boolean> {
    const task = await this.taskRepository.getById(taskId);
    const foundTag = task.tags.find(({ _id }) => _id.equals(tagsId));
    return !!foundTag;
  }

  async addTagToTask(taskId: string, tagsId: string): Promise<void> {
    const doesContainTag = await this.doesTaskContainTag(taskId, tagsId);
    if (doesContainTag) {
      throw new HttpError(400, "Task already contains this tag");
    }
    await this.taskRepository.addTaskTag(taskId, tagsId);
  }

  async removeTagFromTask(taskId: string, tagsId: string): Promise<void> {
    const doesContainTag = await this.doesTaskContainTag(taskId, tagsId);
    if (!doesContainTag) {
      throw new HttpError(400, "Task does not contains this tag");
    }
    await this.taskRepository.removeTaskTag(taskId, tagsId);
  }
}
