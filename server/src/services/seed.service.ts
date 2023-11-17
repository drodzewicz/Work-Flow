import { Service, Inject, Container } from "typedi";
import { env } from "../config/env.config.js";
import { BoardService, AuthService, TagService, MemberService, TaskService } from "../services/index.js";
import { faker } from "@faker-js/faker";
import { getRandomElement } from "../utils/random.utils.js";
import { UserDTO } from "../types/dto/user.dto.js";
import { TagDTO } from "src/types/dto/tag.dto.js";
import { BoardDTO, BoardSimpleDTO, ColumnSimpleDTO } from "src/types/dto/board.dto.js";

@Service()
export class SeedService {
  private boardService: BoardService;
  private authService: AuthService;
  private tagService: TagService;
  private memberService: MemberService;
  private taskService: TaskService;

  constructor() {
    this.authService = Container.get(AuthService);
    this.boardService = Container.get(BoardService);
    this.tagService = Container.get(TagService);
    this.memberService = Container.get(MemberService);
    this.taskService = Container.get(TaskService);
  }

  private createRandomUser() {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "password123",
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
    };
  }

  private createRandomTask(users: any[], columns: any[], tags: any[]) {
    return {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      author: getRandomElement(users) as UserDTO,
      assignee: getRandomElement(users) as UserDTO,
      column: getRandomElement(columns) as ColumnSimpleDTO,
      tag: getRandomElement(tags) as TagDTO,
    };
  }

  private createRandomTag() {
    return {
      name: faker.color.human(),
      key: faker.color.rgb(),
    };
  }

  private createRandomBoard() {
    return {
      name: faker.music.songName(),
      description: faker.lorem.sentence({ min: 3, max: 10 }),
      columns: faker.helpers.multiple(faker.vehicle.manufacturer, {
        count: { min: 3, max: 6 },
      }),
    };
  }

  async generateUsers(options: { count: number }): Promise<UserDTO[]> {
    const users = faker.helpers.multiple(this.createRandomUser, { count: options.count });
    return await Promise.all(users.map((user) => this.authService.register(user)));
  }

  async generateBoardTags(
    options: { count: number | { min: number; max: number } },
    boardId: string,
  ): Promise<TagDTO[]> {
    const tags = faker.helpers.multiple(this.createRandomTag, {
      count: options.count,
    });
    return await Promise.all(tags.map(({ name, key }) => this.tagService.createTag(boardId, { name, key })));
  }

  async generateTasks(
    options: { count: number },
    boardId: string,
    columns: ColumnSimpleDTO[],
    users: UserDTO[],
    tags: TagDTO[],
  ) {
    const tasks = faker.helpers.multiple(() => this.createRandomTask(users, columns, tags), {
      count: 5,
    });
    for (let i in tasks) {
      const { title, description, column, assignee, author, tag } = tasks[i];
      const persistedTask = await this.taskService.createTask({ title, description }, boardId, author._id);

      await Promise.all([
        this.taskService.addTaskToColumn(boardId, column._id, persistedTask._id),
        this.taskService.addTagToTask(persistedTask._id, tag._id),
        this.taskService.addAssigneeToTask(persistedTask._id, assignee._id),
      ]);
    }
  }

  async generateBoards(
    options: { count: number },
    users: UserDTO[],
  ): Promise<{ board: BoardSimpleDTO; columns: ColumnSimpleDTO[] }[]> {
    const boards = faker.helpers.multiple(this.createRandomBoard, { count: options.count });
    return await Promise.all(
      boards.map(async (board) => {
        const { columns, name, description } = board;

        const boardAuthor = getRandomElement(users) as UserDTO;
        const boardMembers = users.filter((user) => user._id !== boardAuthor._id);

        // create a board in the db
        const persistedBoard = await this.boardService.createBoard({ name, description }, boardAuthor._id);
        // create columns on the board
        const persistedColumns = await Promise.all(
          columns.map((columnName) => this.boardService.createColumn(persistedBoard._id, columnName)),
        );
        // add other users to the board
        await Promise.all(boardMembers.map((user) => this.memberService.addUserToBoard(persistedBoard._id, user._id)));

        return { board: persistedBoard, columns: persistedColumns };
      }),
    );
  }
}
