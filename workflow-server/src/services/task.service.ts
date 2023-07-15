import { Service, Inject } from "typedi";
import { TaskRepository, UserRepository, BoardRepository } from "../repositories/index.js";
import { TaskMapper, ColumnTaskMapper } from "../mappers/index.js";
import { TaskDTO, ColumnTaskDTO } from "../types/dto/index.js";
import { AuthUser } from "@/types/utils.type.js";

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
    await this.taskRepository.addTaskToColumn(taskId, boardId, columnId, index);
  }

  async removeTaskFromColumnBoard(boardId: string, taskId: string): Promise<void> {
    await this.taskRepository.removeTaskFromBoard(taskId, boardId);
  }

  async moveTaskToColumn(taskId: string, boardId: string, columnId: string, rowIndex: number): Promise<void> {
    await this.removeTaskFromColumnBoard(boardId, taskId);
    await this.addTaskToColumn(boardId, columnId, taskId, rowIndex);
  }

  async getAllColumnTasks(boardId: string, columnId?: string): Promise<ColumnTaskDTO | ColumnTaskDTO[]> {
    const columnsWithTasks = await this.taskRepository.getBoardTasks(boardId);

    if (columnId) {
      const columnWithTasks = columnsWithTasks.find((column) => column._id.equals(columnId));
      return ColumnTaskMapper(columnWithTasks);
    }
    return columnsWithTasks.map(ColumnTaskMapper);
  }

  async getTask(taskId: string): Promise<TaskDTO> {
    const task = await this.taskRepository.getById(taskId);
    return TaskMapper(task);
  }

  async getTaskBoardId(taskId: string): Promise<string> {
    const task = await this.taskRepository.getById(taskId);
    return task.board.toString();
  }

  async deleteTask(taskId: string): Promise<void> {
    const task = await this.taskRepository.getById(taskId);
    await this.taskRepository.delete(taskId);
    await this.taskRepository.removeTaskFromBoard(taskId, task.board.toString());
  }

  async updateTask(taskId: string, taskData: any) {
    // await this.taskRepository.
    // no opt
  }

  async addAssigneeToTask(taskId: string, userId: string): Promise<void> {
    await this.taskRepository.addTaskAssignee(taskId, userId);
  }

  async removeAssigneeFromTask(taskId: string, userId: string): Promise<void> {
    await this.taskRepository.removeTaskAssignee(taskId, userId);
  }

  async addTagToTask(taskId: string, tagsId: string): Promise<void> {
    await this.taskRepository.addTaskTag(taskId, tagsId);
  }

  async removeTagFromTask(taskId: string, tagsId: string): Promise<void> {
    await this.taskRepository.removeTaskTag(taskId, tagsId);
  }
}
