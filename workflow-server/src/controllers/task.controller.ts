import {
  Param,
  Get,
  Put,
  Post,
  Controller,
  QueryParams,
  UseBefore,
  Delete,
  Patch,
  Body,
  CurrentUser,
} from "routing-controllers";
import { TaskService } from "../services/index.js";
import { Container } from "typedi";
import { GetColumnTasksQueryParams } from "../types/queryParams/task.type.js";
import { CreateTaskPayload, UpdateTaskPayload, MoveTaskPayload } from "../types/request/task.type.js";
import { AuthUser } from "../types/utils.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";

@Controller("/tasks")
@UseBefore(JWTMiddleware)
export class TaskController {
  taskService: TaskService;

  constructor() {
    this.taskService = Container.get(TaskService);
  }

  @Post("/")
  async createTask(@Body() payload: CreateTaskPayload, @CurrentUser() user: AuthUser) {
    const { boardId, columnId, ...taskData } = payload;
    const task = await this.taskService.createTask(taskData, boardId, user);
    await this.taskService.addTaskToColumn(boardId, columnId, task._id.toString());
    return task;
  }

  @Get("/")
  getColumnTasks(@QueryParams() query: GetColumnTasksQueryParams) {
    return this.taskService.getAllColumnTasks(query.boardId, query.columnId);
  }

  @Get("/:taskId")
  getTask(@Param("taskId") taskId: string) {
    return this.taskService.getTask(taskId);
  }

  @Put("/:taskId")
  updateTask(@Param("taskId") taskId: string, @Body() payload: UpdateTaskPayload) {
    return this.taskService.updateTask(taskId, payload);
  }

  @Delete("/:taskId")
  async deleteTask(@Param("taskId") taskId: string) {
    await this.taskService.deleteTask(taskId);
    return { message: "Deleted task successfully" };
  }

  @Patch("/:taskId/move")
  async moveTask(@Param("taskId") taskId: string, @Body() payload: MoveTaskPayload) {
    const { boardId, columnId, rowIndex } = payload;
    await this.taskService.moveTaskToColumn(taskId, boardId, columnId, rowIndex);
    return this.taskService.getAllColumnTasks(boardId, columnId);
  }

  @Patch("/:taskId/tags")
  addTag() {
    // TODO: Add tag to task
  }

  @Delete("/:taskId/tags/:tagId")
  removeTag() {
    // TODO: remove tag from task
  }

  @Patch("/:taskId/assignees")
  addAssignee() {
    // TODO: Add assignee to task
  }

  @Delete("/:taskId/assignees/:userId")
  removeAssignee() {
    // TODO: remove tag from task
  }
}
