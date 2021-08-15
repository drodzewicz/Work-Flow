const BoardService = require("../services/BoardService");
const { RequiredFieldError, AuthError } = require("../error/");
const mockBoardRepository = require("./mocks/repositories/mockBoardRepository");
const mockTagRepository = require("./mocks/repositories/mockTagRepository");
const mockTaskRepository = require("./mocks/repositories/mockTaskRepository");
const mockDatabase = require("./mocks/data");

describe("BOARD", () => {
  let boardService;
  let BoardRepository;
  let TaskRepository;
  let TagRepository;

  beforeEach(() => {
    BoardRepository = mockBoardRepository();
    TaskRepository = mockTaskRepository();
    TagRepository = mockTagRepository();

    boardService = BoardService({
      BoardRepository,
      TaskRepository,
      TagRepository,
    });
  });

  describe("CREATE BOARD", () => {
    it("should pass values: name, description, author, members", async () => {
      const authorId = "author_id";
      const boardData = {
        name: "test_board",
        description: "test_description",
      };
      await boardService.createBoard(boardData, authorId);
      const passedBoardFields = BoardRepository.create.mock.calls[0][0];
      expect(passedBoardFields).toHaveProperty("name");
      expect(passedBoardFields).toHaveProperty("description");
      expect(passedBoardFields).toHaveProperty("author");
      expect(passedBoardFields).toHaveProperty("members");
    });

    it("should add authorId to members array with role of OWNER", async () => {
      const authorId = "author_id";
      const boardData = {
        name: "test_board",
        description: "test_description",
      };
      await boardService.createBoard(boardData, authorId);
      const { members } = BoardRepository.create.mock.calls[0][0];
      expect(members).toContainEqual({ user: authorId, role: "OWNER" });
    });
  });

  describe("UPDATE BOARD", () => {
    it("should pass fields: ....", async () => {
      const boardData = {
        name: "updated_test_board",
        description: "updated_test_description",
      };
      await boardService.updateBoard(boardData, "board_id");
      expect(BoardRepository.update.mock.calls[0][1]).toEqual(boardData);
    });
  });

  describe("GET USER BOARDS", () => {
    it("should paginate boards", async () => {
      const { boards } = await boardService.getUserBoards("userId", { limit: 3, page: 1 });
      expect(boards.length).toBe(3);
    });

    it("should paginate boards", async () => {
      const { boards } = await boardService.getUserBoards("userId", { limit: 3, page: 1 });
      expect(boards.length).toBe(3);
    });

    it("should return boards with pinned boolean value if board is pinned", async () => {
      const pinnedBoardsIds = mockDatabase.pinnedBoards.map((board) => board._id);
      const { boards } = await boardService.getUserBoards("userId", { limit: 3, page: 1 });
      boards.forEach((board) => {
        if (board.pinned) {
          expect(pinnedBoardsIds).toContain(board._id);
        } else {
          expect(pinnedBoardsIds).not.toContain(board._id);
        }
      });
    });

    it("should return boards with isAuthor boolean value if user is author", async () => {
      const userId = mockDatabase.users[0]._id;
      const authorBoards = mockDatabase.boards
        .filter((board) => board.author === userId)
        .map((board) => board._id);
      const { boards } = await boardService.getUserBoards(userId, { limit: 3, page: 1 });
      boards.forEach((board) => {
        if (board.isAuthor) {
          expect(authorBoards).toContain(board._id);
        } else {
          expect(authorBoards).not.toContain(board._id);
        }
      });
    });
  });
});
