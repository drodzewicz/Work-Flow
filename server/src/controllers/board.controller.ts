import {
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    Controller,
    QueryParams,
    UseBefore,
    CurrentUser,
    Authorized,
    Patch,
} from "routing-controllers";
import { BoardService, MemberService, UserService } from "../services/index.js";
import { Container } from "typedi";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { AuthUser, Pagination } from "../types/utils.type.js";
import { CreateBoardPayload, UpdateBoardPayload } from "../types/request/board.type.js";
import { fieldErrorsHandler } from "../utils/payloadValidation.utils.js";
import {
    boardPayloadValidator,
    updateBoardPayloadValidator,
} from "../validators/board.validator.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";
import { Permissions } from "../config/permissions.config.js";

@Controller("/boards")
@UseBefore(JWTMiddleware)
export class BoardController {
    boardService: BoardService;
    memberService: MemberService;
    userService: UserService;

    constructor() {
        this.boardService = Container.get(BoardService);
        this.memberService = Container.get(MemberService);
        this.userService = Container.get(UserService);
    }

    @Post("/")
    createBorad(@Body() board: CreateBoardPayload, @CurrentUser() user: AuthUser) {
        fieldErrorsHandler(boardPayloadValidator(board));

        return this.boardService.createBoard(board, user.id.toString());
    }

    @Get("/")
    getBoards(@QueryParams() query: Pagination) {
        const options = getPaginationSettings(query);
        return this.boardService.getBoards(options);
    }

    @Get("/:boardId")
    @Authorized()
    async getBoard(@Param("boardId") boardId: string) {
        const board = await this.boardService.getBoard(boardId);
        return board;
    }

    @Delete("/:boardId")
    @Authorized(Permissions.BOARD_DELETE)
    async deleteBoard(@Param("boardId") boardId: string) {
        const { name } = await this.boardService.getBoard(boardId);
        const members = await this.memberService.getBoardMembers(boardId);

        const notification = {
            title: "Board has been deleted",
            description: `Board "${name}" has been deleted `,
            key: "board.deleted",
            attributes: {
                boardId,
            },
        };
        const memberMessages = members.map(({ user }) =>
            this.userService.addUserNotifications(user._id, notification)
        );

        try {
            await this.boardService.deleteBoard(boardId);
            await Promise.all(memberMessages);
        } catch (error) {
            throw error;
        }

        return { message: "Board was successfully deleted" };
    }

    @Put("/:boardId")
    @Authorized(Permissions.BOARD_UPDATE)
    async updateBoard(@Param("boardId") boardId: string, @Body() payload: UpdateBoardPayload) {
        fieldErrorsHandler(updateBoardPayloadValidator(payload));

        await this.boardService.getBoard(boardId);
        return await this.boardService.updateBoard(boardId, payload);
    }

    @Patch("/:boardId/leave")
    @Authorized()
    async LeaveBoard(@Param("boardId") boardId: string, @CurrentUser() user: AuthUser) {
        const members = await this.memberService.getBoardMembers(boardId);
        await this.memberService.getBoardMember(boardId, user.id.toString());

        await this.memberService.removeUserFromBoard(boardId, user.id.toString());

        // if last member leaves the board then delete the board
        if (members.length === 1) {
            await this.boardService.deleteBoard(boardId);
        }

        return { message: "User removed from the board" };
    }
}
