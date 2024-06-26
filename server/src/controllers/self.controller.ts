import {
    Param,
    Get,
    Put,
    Delete,
    Controller,
    QueryParams,
    UseBefore,
    Body,
    CurrentUser,
    Patch,
} from "routing-controllers";
import { UserService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { AuthUser, Pagination } from "../types/utils.type.js";
import { UpdateUserPayload, UpdateUserAvatarPayload } from "../types/request/user.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";
import { fieldErrorsHandler } from "../utils/payloadValidation.utils.js";
import {
    updateUserAvatarPayloadValidator,
    updateUserPayloadValidator,
} from "../validators/user.validator.js";
import { BoadsListQueryParams } from "../types/queryParams/board.type.js";

@Controller("/self")
@UseBefore(JWTMiddleware)
export class SelfController {
    userService: UserService;
    boardService: BoardService;

    constructor() {
        this.userService = Container.get(UserService);
        this.boardService = Container.get(BoardService);
    }

    @Get("/")
    getCurrentUser(@CurrentUser() user: AuthUser) {
        return this.userService.getUser(user.id.toString());
    }

    @Put("/")
    updatehUser(@CurrentUser() user: AuthUser, @Body() payload: UpdateUserPayload) {
        fieldErrorsHandler(updateUserPayloadValidator(payload));

        return this.userService.updateUser(user.id.toString(), payload);
    }

    @Patch("/avatar")
    async updateUserAvatar(
        @CurrentUser() user: AuthUser,
        @Body() payload: UpdateUserAvatarPayload
    ) {
        fieldErrorsHandler(updateUserAvatarPayloadValidator(payload));
        return this.userService.updateUserAvatar(user.id.toString(), payload.image);
    }

    @Get("/boards")
    async userBoards(@CurrentUser() user: AuthUser, @QueryParams() query: BoadsListQueryParams) {
        const pagination = getPaginationSettings(query);
        return this.boardService.getUserBoards(user.id.toString(), {
            ...pagination,
            name: query?.name,
        });
    }

    @Get("/pinnedBoards")
    async pinnedUserBoards(@CurrentUser() user: AuthUser) {
        return this.userService.getUserPinnedBoards(user.id.toString());
    }

    @Put("/pinnedBoards/:boardId")
    async togglePinBoard(@CurrentUser() user: AuthUser, @Param("boardId") boardId: string) {
        const isPinned = await this.userService.togglePinBoard(user.id.toString(), boardId);

        return { message: `Board was successfully ${isPinned ? "pinned" : "unpinned"}` };
    }

    @Get("/notifications")
    async getNotifications(@CurrentUser() user: AuthUser, @QueryParams() query: Pagination) {
        const pagination = getPaginationSettings(query);

        return this.userService.getUserNotifications(user.id.toString(), { ...pagination });
    }

    @Delete("/notifications")
    async clearNotifications(@CurrentUser() user: AuthUser) {
        await this.userService.deleteUserNotifications(user.id.toString());
        return { message: "notifications removed succesfully" };

    }

    @Delete("/notifications/:notificationId")
    async removeNotifications(
        @CurrentUser() user: AuthUser,
        @Param("notificationId") notificationId: string
    ) {
        await this.userService.removeUserNotifications(user.id.toString(), notificationId);
        return { message: "notification removed succesfully" };
    }
}
