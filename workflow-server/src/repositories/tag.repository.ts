import { Service } from "typedi";
import { Board, Tag } from "../models/index.js";
import { ITag, TagFields, TagDocument, BoardModel } from "../types/database/index.js";
import { GenericRepository } from "./generic.repository.js";

@Service()
export class TagRepository extends GenericRepository<ITag, TagDocument, TagFields> {
  private boardModel: BoardModel;

  constructor() {
    super();
    this.fields = ["_id", "name", "key", "board"];
    this.model = Tag;
    this.boardModel = Board;
  }

  async addTagToBoard(boardId: string, tagId: string): Promise<void> {
    await this.boardModel.findOneAndUpdate({ _id: boardId }, { $push: { tags: tagId } }, { new: true });
  }

  async removeTagToBoard(boardId: string, tagId: string): Promise<void> {
    await this.boardModel.findOneAndUpdate({ _id: boardId }, { $pull: { tags: tagId } });
  }

  async getBoardTags(boardId): Promise<TagDocument[]> {
    return this.model.find({ board: boardId }, this.fields.join(" "));
  }
}
