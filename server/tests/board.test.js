const BoardService = require("../services/BoardService");
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

  describe("GET USER PINED BOARDS", () => {
    it("should return all pinned boards with pinned value equal true", async () => {
      const boards = await boardService.getUserPinnedBoards("userId");
      boards.forEach((board) => {
        expect(board.pinned).toBe(true);
      });
    });
  });

  describe("GET BOARD", () => {
    it("should return full board", async () => {
      const board = await boardService.getBoard("boardId", false);
      expect(board).toHaveProperty("_id");
      expect(board).toHaveProperty("name");
      expect(board).toHaveProperty("description");
      expect(board).toHaveProperty("author");
      expect(board).toHaveProperty("columns");
    });

    it("should return short board", async () => {
      const board = await boardService.getBoard("boardId", true);
      expect(board).toHaveProperty("_id");
      expect(board).toHaveProperty("name");
      expect(board).toHaveProperty("description");
      expect(board).toHaveProperty("author");
      expect(board).not.toHaveProperty("columns");
    });
  });

  describe("TOGGLE PIN BOARD", () => {
    it("should pin board", async () => {
      const notPinnenBoardId = mockDatabase.boards[4]._id;
      const { pinned } = await boardService.togglePinBoard(mockDatabase.users[0], notPinnenBoardId);
      expect(BoardRepository.pinBoard).toHaveBeenCalledWith(mockDatabase.users[0], notPinnenBoardId);
      expect(pinned).toBe(true);
    });

    it("should unpin board", async () => {
      const pinnenBoardId = mockDatabase.boards[0]._id;
      const { pinned } = await boardService.togglePinBoard(mockDatabase.users[0], pinnenBoardId);
      expect(BoardRepository.unpinBoard).toHaveBeenCalledWith(mockDatabase.users[0], pinnenBoardId);
      expect(pinned).toBe(false);
    });
  });

  describe("DELETE BOARD", () => {
    const boardToBeDeleted = "boardId";
    it("should delete all board tasks", async () => {
      await boardService.deleteBoard(boardToBeDeleted);
      expect(TaskRepository.deleteBoardTasks.mock.calls[0][0]).toBe(boardToBeDeleted)
    })

    it("should delete all board tags", async () => {
      await boardService.deleteBoard(boardToBeDeleted);
      const boardTagIdList = mockDatabase.tags.map(({_id}) => _id);
      expect(TagRepository.deleteMany.mock.calls[0][0].sort()).toEqual(boardTagIdList.sort())
    })

    it("should remove deleted board from pinned list of all users", async () => {
      await boardService.deleteBoard(boardToBeDeleted);
      expect(BoardRepository.delete.mock.calls[0][0]).toBe(boardToBeDeleted)
    })

    it("should delete board", async () => {
      await boardService.deleteBoard(boardToBeDeleted);
      expect(BoardRepository.delete.mock.calls[0][0]).toBe(boardToBeDeleted)
    })
  })
});
