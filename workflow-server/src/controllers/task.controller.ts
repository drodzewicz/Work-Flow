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
  HttpError,
  Authorized,
} from "routing-controllers";
import { TaskService, MemberService, TagService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { GetColumnTasksQueryParams } from "../types/queryParams/task.type.js";
import { CreateTaskPayload, UpdateTaskPayload, MoveTaskPayload } from "../types/request/task.type.js";
import { AuthUser } from "../types/utils.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import {
  createTaskPayloadValidator,
  updateTaskPayloadValidator,
  moveTaskPayloadValidator,
  MoveTaskIndexPayloadSchema,
} from "../validators/task.validator.js";
import { validator } from "../utils/payloadValidation.utils.js";
import { fieldErrorsHandler } from "../utils/payloadValidation.utils.js";
import { Permissions } from "../config/permissions.config.js";

@Controller("/tasks")
@UseBefore(JWTMiddleware)
export class TaskController {
  taskService: TaskService;
  tagService: TagService;
  memberService: MemberService;
  boardService: BoardService;

  constructor() {
    this.taskService = Container.get(TaskService);
    this.memberService = Container.get(MemberService);
    this.tagService = Container.get(TagService);
    this.boardService = Container.get(BoardService);
  }

  @Get("/")
  @Authorized()
  async getColumnTasks(@QueryParams() query: GetColumnTasksQueryParams) {
    if (!query.boardId) {
      throw new HttpError(400, "query parameter boardId is required");
    }
    await this.boardService.getBoard(query.boardId);
    if (query.columnId) {
      return this.taskService.getColumnTasks(query.boardId, query.columnId);
    }
    return this.taskService.getAllColumnTasks(query.boardId);
  }

  @Post("/")
  @Authorized(Permissions.TASK_CREATE)
  async createTask(@Body() payload: CreateTaskPayload, @CurrentUser() user: AuthUser) {
    fieldErrorsHandler(createTaskPayloadValidator(payload));
    const { boardId, columnId, ...taskData } = payload;

    await this.boardService.getBoard(boardId);
    const task = await this.taskService.createTask(taskData, boardId, user);
    await this.taskService.addTaskToColumn(boardId, columnId, task._id.toString());
    return task;
  }

  @Get("/:taskId")
  @Authorized()
  getTask(@Param("taskId") taskId: string) {
    return this.taskService.getTask(taskId);
  }

  @Put("/:taskId")
  @Authorized(Permissions.TASK_CREATE)
  async updateTask(@Param("taskId") taskId: string, @Body() payload: UpdateTaskPayload) {
    fieldErrorsHandler(updateTaskPayloadValidator(payload));
    return this.taskService.updateTask(taskId, payload);
  }

  @Delete("/:taskId")
  @Authorized(Permissions.TASK_DELETE)
  async deleteTask(@Param("taskId") taskId: string) {
    await this.taskService.getTask(taskId);
    await this.taskService.deleteTask(taskId);
    return { message: "Deleted task successfully" };
  }

  @Patch("/:taskId/move")
  @Authorized(Permissions.TASK_MOVE)
  async moveTask(@Param("taskId") taskId: string, @Body() payload: MoveTaskPayload) {
    fieldErrorsHandler(moveTaskPayloadValidator(payload));
    const { boardId, columnId, rowIndex } = payload;

    const { tasks } = await this.taskService.getColumnTasks(boardId, columnId);
    const moveTaskIndexPayloadValidator = validator(MoveTaskIndexPayloadSchema(tasks.length));
    fieldErrorsHandler(moveTaskIndexPayloadValidator({ rowIndex }));

    await this.taskService.getTask(taskId);
    await this.taskService.moveTaskToColumn(taskId, boardId, columnId, rowIndex);
    return this.taskService.getColumnTasks(boardId, columnId);
  }

  @Patch("/:taskId/tags/:tagId")
  @Authorized(Permissions.TASK_CREATE)
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
  @Authorized(Permissions.TASK_CREATE)
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
  @Authorized(Permissions.TASK_CREATE)
  async addAssignee(@Param("taskId") taskId: string, @Param("userId") userId: string): Promise<{ message: string }> {
    const boardId = await this.taskService.getTaskBoardId(taskId);
    await this.memberService.getBoardMember(boardId, userId);
    await this.taskService.addAssigneeToTask(taskId, userId);
    return { message: "Assignee added to the task" };
  }

  @Delete("/:taskId/assignees/:userId")
  @Authorized(Permissions.TASK_CREATE)
  async removeAssignee(@Param("taskId") taskId: string, @Param("userId") userId: string): Promise<{ message: string }> {
    const boardId = await this.taskService.getTaskBoardId(taskId);
    await this.memberService.getBoardMember(boardId, userId);
    await this.taskService.removeAssigneeFromTask(taskId, userId);
    return { message: "Assignee removed from the task" };
  }
}
