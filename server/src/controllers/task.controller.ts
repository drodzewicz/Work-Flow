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
import {
    TaskService,
    MemberService,
    TagService,
    BoardService,
    UserService,
} from "../services/index.js";
import { Container } from "typedi";
import { GetColumnTasksQueryParams } from "../types/queryParams/task.type.js";
import {
    CreateTaskPayload,
    UpdateTaskPayload,
    MoveTaskPayload,
} from "../types/request/task.type.js";
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
    userService: UserService;

    constructor() {
        this.taskService = Container.get(TaskService);
        this.memberService = Container.get(MemberService);
        this.tagService = Container.get(TagService);
        this.boardService = Container.get(BoardService);
        this.userService = Container.get(UserService);
    }

    @Get("/")
    @Authorized()
    async getColumnTasks(
        @QueryParams() query: GetColumnTasksQueryParams,
        @CurrentUser() user: AuthUser
    ) {
        if (!query.boardId) {
            throw new HttpError(400, "query parameter boardId is required");
        }
        await this.memberService.getBoardMember(query.boardId, user.id.toString());
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
        const { boardId, columnId, assignees, tags, ...taskData } = payload;

        const board = await this.boardService.getBoard(boardId);

        if (board.columns.length === 0) {
            throw new HttpError(400, "Board must have at least one column for task to be created");
        }

        const task = await this.taskService.createTask(taskData, boardId, user.id.toString());

        // if column is not proved then assign the first column of the board
        await this.taskService.addTaskToColumn(
            boardId,
            columnId ?? board.columns[0]._id,
            task._id.toString()
        );

        for (let i = 0; i < tags.length; i++) {
            await this.taskService.addTagToTask(task._id, tags[i]);
        }

        // if assignees are proived then loop though them and add them to the task
        if (assignees) {
            const notification = {
                title: "Assigned to task",
                description: `You have been assigned to task "${task.title}"`,
                key: "task.assignee.added",
                attributes: {
                    taskId: task._id,
                    boardId,
                },
            };

            for (let i = 0; i < assignees.length; i++) {
                try {
                    await this.taskService.addAssigneeToTask(task._id, assignees[i]);
                    await this.userService.addUserNotifications(assignees[i], notification);
                } catch (error) {
                    throw error;
                }
            }
        }

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
        const { assignees, tags, ...taskData } = payload;

        const task = await this.taskService.updateTask(taskId, taskData);

        const boardId = await this.taskService.getTaskBoardId(taskId);

        if (tags) {
            const previousTags = task.tags.map((tag) => tag._id.toString());
            const removedTags = previousTags.filter((tag) => !tags.includes(tag));
            const newTags = tags.filter((tag) => !previousTags.includes(tag));

            for (let i = 0; i < newTags.length; i++) {
                await this.taskService.addTagToTask(taskId, newTags[i]);
            }

            for (let i = 0; i < removedTags.length; i++) {
                await this.taskService.removeTagFromTask(taskId, removedTags[i]);
            }
        }

        // if assignees are proived then loop though them and add them to the task
        if (assignees) {
            const previousAssignees = task.assignees.map((assignee) => assignee._id.toString());
            const removedAssignees = previousAssignees.filter(
                (assignee) => !assignees.includes(assignee)
            );
            const newAssignees = assignees.filter(
                (assignee) => !previousAssignees.includes(assignee)
            );

            for (let i = 0; i < removedAssignees.length; i++) {
                await this.taskService.removeAssigneeFromTask(taskId, removedAssignees[i]);
            }

            const notification = {
                title: "Assigned to task",
                description: `You have been assigned to task "${task.title}"`,
                key: "task.assignee.added",
                attributes: {
                    taskId,
                    boardId,
                },
            };

            for (let i = 0; i < newAssignees.length; i++) {
                try {
                    await this.taskService.addAssigneeToTask(taskId, newAssignees[i]);
                    await this.userService.addUserNotifications(newAssignees[i], notification);
                } catch (error) {
                    throw error;
                }
            }
        }

        return task;
    }

    @Delete("/:taskId")
    @Authorized(Permissions.TASK_DELETE)
    async deleteTask(@Param("taskId") taskId: string) {
        const { assignees, title } = await this.taskService.getTask(taskId);
        const boardId = await this.taskService.getTaskBoardId(taskId);

        const notification = {
            title: "Task has been deleted",
            description: `Task "${title}" which you were assigned to was deleted `,
            key: "task.deleted",
            attributes: {
                taskId,
                boardId,
            },
        };
        const assigneesMessages = assignees.map((assignee) =>
            this.userService.addUserNotifications(assignee._id, notification)
        );

        try {
            await this.taskService.deleteTask(taskId);
            await Promise.all(assigneesMessages);
        } catch (error) {
            throw error;
        }

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
    async addTag(
        @Param("taskId") taskId: string,
        @Param("tagId") tagId: string
    ): Promise<{ message: string }> {
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
    async removeTag(
        @Param("taskId") taskId: string,
        @Param("tagId") tagId: string
    ): Promise<{ message: string }> {
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
    async addAssignee(
        @Param("taskId") taskId: string,
        @Param("userId") userId: string
    ): Promise<{ message: string }> {
        const { title } = await this.taskService.getTask(taskId);
        const boardId = await this.taskService.getTaskBoardId(taskId);

        const notification = {
            title: "Assigned to task",
            description: `You have been assigned to task "${title}"`,
            key: "task.assignee.added",
            attributes: {
                taskId,
                boardId,
            },
        };

        try {
            await this.taskService.addAssigneeToTask(taskId, userId);
            await this.userService.addUserNotifications(userId, notification);
        } catch (error) {
            throw error;
        }

        return { message: "Assignee added to the task" };
    }

    @Delete("/:taskId/assignees/:userId")
    @Authorized(Permissions.TASK_CREATE)
    async removeAssignee(
        @Param("taskId") taskId: string,
        @Param("userId") userId: string
    ): Promise<{ message: string }> {
        const boardId = await this.taskService.getTaskBoardId(taskId);
        await this.memberService.getBoardMember(boardId, userId);
        await this.taskService.removeAssigneeFromTask(taskId, userId);
        return { message: "Assignee removed from the task" };
    }
}
