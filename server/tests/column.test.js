const ColumnService = require("../services/ColumnService");
const mockBoardRepository = require("./mocks/repositories/mockBoardRepository");
const mockColumnRepository = require("./mocks/repositories/mockColumnRepository");
const mockTaskRepository = require("./mocks/repositories/mockTaskRepository");
const mockDatabase = require("./mocks/data");

describe("COLUMN", () => {
  let columnService;
  let BoardRepository;
  let TaskRepository;
  let ColumnRepository;

  beforeEach(() => {
    BoardRepository = mockBoardRepository();
    TaskRepository = mockTaskRepository();
    ColumnRepository = mockColumnRepository();

    columnService = ColumnService({
      ColumnRepository,
      TaskRepository,
      BoardRepository,
    });
  });

  describe("CREATE COLUMN", () => {
    it("should create a column", async () => {
      const boardId = "board_id";
      const columnName = "column_name";

      await columnService.createColumn(boardId, columnName);
      expect(ColumnRepository.create.mock.calls[0][0]).toBe(boardId);
    });

    it("should create a column with last index in the list", async () => {
      const boardId = "board_id";
      const columnName = "column_name";
      const boardColumnCount = mockDatabase.columns.length;

      await columnService.createColumn(boardId, columnName);
      expect(ColumnRepository.create.mock.calls[0][1]).toEqual({
        name: columnName,
        columnIndex: boardColumnCount,
      });
    });
  });

  describe("DELETE COLUMN", () => {
    const boardId = "board_id";
    const columnName = "column_name";

    it("should delete all task that are in the column", async () => {
      await columnService.deleteColumn(boardId, columnName);
      expect(TaskRepository.deleteMany).toHaveBeenCalled();
    });
    it("should dele column", async () => {
      await columnService.deleteColumn(boardId, columnName);
      expect(ColumnRepository.delete).toHaveBeenCalledWith(boardId, columnName);
    });
  });

  describe("MOVE COLUMN", () => {
    it("should change column index", async () => {
      const boardId = "board_id";
      const sourceIndex = 0;
      const destinationIndex = 1;
    
      const columnsIdsOrderBeforeMove = mockDatabase.fullBoard.columns.map((col) => col._id);
      const columnsAfterMove = [
        columnsIdsOrderBeforeMove[1],
        columnsIdsOrderBeforeMove[0],
        columnsIdsOrderBeforeMove[2],
      ];

      await columnService.moveColumn(boardId, sourceIndex, destinationIndex);
      const { columns } = BoardRepository.save.mock.calls[0][0];
      
      columnsAfterMove.forEach((columnsId, index) => {
        expect(columns[index]._id).toBe(columnsAfterMove[index])
      })
    });
  });
});
