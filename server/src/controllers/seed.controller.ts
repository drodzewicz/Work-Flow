import { Param, Post, Controller, UseBefore, Body } from "routing-controllers";
import { SeedService, UserService } from "../services/index.js";
import { Container } from "typedi";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { SeedPayload } from "../types/request/seed.type.js";
import { fieldErrorsHandler } from "../utils/payloadValidation.utils.js";
import { seedPayloadValidator } from "../validators/seed.validator.js";

@Controller("/seed")
@UseBefore(JWTMiddleware)
export class SeedController {
    private DEFAULT_SEED_COUNT = 5;

    private seedService: SeedService;
    private userService: UserService;

    constructor() {
        this.seedService = Container.get(SeedService);
        this.userService = Container.get(UserService);
    }

    @Post("/")
    async seedData(@Body() payload: SeedPayload) {
        fieldErrorsHandler(seedPayloadValidator(payload));

        const users = await this.seedService.generateUsers({
            count: payload.userCount ?? this.DEFAULT_SEED_COUNT,
        });
        const boards = await this.seedService.generateBoards(
            { count: payload.boardCount ?? this.DEFAULT_SEED_COUNT },
            users
        );

        await Promise.all(
            boards.map(async ({ board, columns }) => {
                const tags = await this.seedService.generateBoardTags(
                    { count: payload.tagCount ?? this.DEFAULT_SEED_COUNT },
                    board._id
                );
                return this.seedService.generateTasks(
                    { count: payload.taskCount ?? this.DEFAULT_SEED_COUNT },
                    board._id,
                    columns,
                    users,
                    tags
                );
            })
        );

        return { message: "Data successfully seeded" };
    }

    @Post("/users")
    async seedUsers(@Body() payload: { count: number }) {
        const { count } = payload;
        await this.seedService.generateUsers({ count: count ?? this.DEFAULT_SEED_COUNT });

        return { message: "New users generated" };
    }

    @Post("/boards")
    async seedBoards(@Body() payload: { count: number }) {
        const { count } = payload;
        const userCount = 5;
        let { users } = await this.userService.getAllUsers({ limit: userCount, page: 0 });

        // if users are not in the database then generate new ones
        if (users.length === 0) {
            users = await this.seedService.generateUsers({ count: userCount });
        }
        await this.seedService.generateBoards({ count: count ?? this.DEFAULT_SEED_COUNT }, users);

        return { message: "New boards generated" };
    }

    @Post("/boards/:boardId/tags")
    async seedBoardTags(@Param("boardId") boardId: string, @Body() payload: { count: number }) {
        await this.seedService.generateBoardTags({ count: { min: 3, max: 7 } }, boardId);
        return { message: "New tags generated" };
    }
}
