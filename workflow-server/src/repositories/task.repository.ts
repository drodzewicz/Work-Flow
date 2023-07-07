import { Service } from "typedi";
import { Task, Board } from "../models/index.js";
import { TaskDocument, ITask, TaskFields, BoardModel, ColumnDocument, BoardDocument } from "../types/database/index.js";
import { UserFields } from "../types/database/index.js";
import { GenericRepository } from "./generic.repository.js";

@Service()
export class TaskRepository extends GenericRepository<ITask, TaskDocument, TaskFields> {
  private boardModel: BoardModel;
  private userFields: UserFields[];

  constructor() {
    super();
    this.fields = ["_id", "title", "description", "author", "board", "assignees", "tags"];
    this.userFields = ["_id", "username", "avatarImageURL", "name", "surname", "email"];
    this.model = Task;
    this.boardModel = Board;
  }

  async addTaskToColumn(taskId: string, boardId: string, columnId: string, index?: number): Promise<BoardDocument> {
    const board = await this.boardModel.findById(boardId);
    const task = await this.model.findById(taskId);
    const column = board.columns.find((column) => column._id.equals(columnId));
    if (!index || index >= board.columns.length) {
      column.tasks.push(task);
    } else {
      column.tasks.splice(index, 0, task);
    }
    return await board.save();
  }

  async removeTaskFromColumn(taskId: string, boardId: string, columnId: string): Promise<BoardDocument> {
    const board = await this.boardModel.findById(boardId);
    const column = board.columns.find((column) => column._id.equals(columnId));
    column.tasks = column.tasks.filter((task) => !task._id.equals(taskId));
    return await board.save();
  }

  async removeTaskFromBoard(taskId: string, boardId: string): Promise<void> {
    await Board.findOneAndUpdate(
      { _id: boardId, columns: { $elemMatch: { tasks: taskId } } },
      { $pull: { "columns.$.tasks": taskId } }
    );
  }

  async getBoardTasks(boardId: string): Promise<ColumnDocument[]> {
    const board = await this.boardModel.findById(boardId).populate({
      path: "columns",
      populate: {
        path: "tasks",
        select: this.fields.join(" "),
      },
    });
    return board.columns;
  }

  async getById(id: string): Promise<TaskDocument | null> {
    this.validateId(id);
    return await this.model.findById(id, this.fields.join(" ")).populate({
      path: "author",
      select: this.userFields.join(" "),
    });
  }
}
