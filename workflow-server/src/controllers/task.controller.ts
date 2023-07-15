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
  NotFoundError,
} from "routing-controllers";
import { TaskService, MemberService, TagService } from "../services/index.js";
import { Container } from "typedi";
import { GetColumnTasksQueryParams } from "../types/queryParams/task.type.js";
import { CreateTaskPayload, UpdateTaskPayload, MoveTaskPayload } from "../types/request/task.type.js";
import { AuthUser } from "../types/utils.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";

@Controller("/tasks")
@UseBefore(JWTMiddleware)
export class TaskController {
  taskService: TaskService;
  tagService: TagService;
  memberService: MemberService;

  constructor() {
    this.taskService = Container.get(TaskService);
    this.memberService = Container.get(MemberService);
    this.tagService = Container.get(TagService);
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

  @Patch("/:taskId/tags/:tagId")
  async addTag(@Param("taskId") taskId: string, @Param("tagId") tagId: string): Promise<{ message: string }> {
    const boardId = await this.taskService.getTaskBoardId(taskId);
    const tags = await this.tagService.getBoardTags(boardId);
    const tag = tags.find(({ _id }) => _id == tagId);
    if (!tag) {
      throw new NotFoundError("Tag does not exist on the board");
    }
    await this.taskService.addTagToTask(taskId, tagId);
    return { message: "Tag added to the task" };
  }

  @Delete("/:taskId/tags/:tagId")
  async removeTag(@Param("taskId") taskId: string, @Param("tagId") tagId: string): Promise<{ message: string }> {
    const boardId = await this.taskService.getTaskBoardId(taskId);
    const tags = await this.tagService.getBoardTags(boardId);
    const tag = tags.find(({ _id }) => _id == tagId);
    if (!tag) {
      throw new NotFoundError("Tag does not exist on the board");
    }
    await this.taskService.removeTagFromTask(taskId, tagId);
    return { message: "Tag removed from the task" };
  }

  @Patch("/:taskId/assignees/:userId")
  async addAssignee(@Param("taskId") taskId: string, @Param("userId") userId: string): Promise<{ message: string }> {
    const boardId = await this.taskService.getTaskBoardId(taskId);
    await this.memberService.getBoardMember(boardId, userId);
    await this.taskService.addAssigneeToTask(taskId, userId);
    return { message: "Assignee added to the task" };
  }

  @Delete("/:taskId/assignees/:userId")
  async removeAssignee(@Param("taskId") taskId: string, @Param("userId") userId: string): Promise<{ message: string }> {
    const boardId = await this.taskService.getTaskBoardId(taskId);
    await this.memberService.getBoardMember(boardId, userId);
    await this.taskService.removeAssigneeFromTask(taskId, userId);
    return { message: "Assignee removed from the task" };
  }
}
