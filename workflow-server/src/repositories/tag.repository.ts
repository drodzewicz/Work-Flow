import { Service } from "typedi";
import { Board, Tag, Task } from "../models/index.js";
import { ITag, TagFields, TagDocument, BoardModel, TaskModel } from "../types/database/index.js";
import { GenericRepository } from "./generic.repository.js";

@Service()
export class TagRepository extends GenericRepository<ITag, TagDocument, TagFields> {
  private boardModel: BoardModel;
  private taskModel: TaskModel;

  constructor() {
    super();
    this.fields = ["_id", "name", "key", "board"];
    this.model = Tag;
    this.boardModel = Board;
    this.taskModel = Task;
  }

  async addTagToBoard(boardId: string, tagId: string): Promise<void> {
    await this.boardModel.findOneAndUpdate({ _id: boardId }, { $push: { tags: tagId } }, { new: true });
  }

  async removeTagFromTasks(boardId: string, tagId: string): Promise<void> {
    await this.taskModel.findOneAndUpdate({ board: boardId }, { $pull: { tags: tagId } });
  }

  async removeTagFromBoard(boardId: string, tagId: string): Promise<void> {
    await this.boardModel.updateMany({ _id: boardId }, { $pull: { tags: tagId } });
  }

  async getBoardTags(boardId): Promise<TagDocument[]> {
    return this.model.find({ board: boardId }, this.fields.join(" "));
  }
}
