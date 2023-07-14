import { Service } from "typedi";
import { User, Board } from "../models/index.js";
import { UserModel, BoardDocument, IBoard, BoardFields, UserFields } from "../types/database/index.js";
import { Pagination, PaginatedResult } from "../types/utils.type.js";
import { GenericRepository } from "./generic.repository.js";
import { RoleNames } from "../config/permissions.config.js";

@Service()
export class MemberRepository extends GenericRepository<IBoard, BoardDocument, BoardFields> {
  private userModel: UserModel;
  private userFields: UserFields[];

  constructor() {
    super();
    this.fields = ["_id", "members"];
    this.userFields = ["_id", "username", "avatarImageURL", "name", "surname", "email"];
    this.model = Board;
    this.userModel = User;
  }

  async getBoardMembers(boardId: string) {
    const { members } = await this.model
      .findById(boardId, "_id members")
      .populate({ path: "members", populate: { path: "user", select: this.userFields.join(" ") } });
    return members;
  }

  async getBoardMember(boardId: string, userId: string) {
    const { members } = await this.model
      .findById(boardId, "_id members")
      .populate({ path: "members", populate: { path: "user", select: this.userFields.join(" ") } });
    return members.find((member) => (member as any)?.user._id.equals(userId));
  }

  async addUserToBoard(boardId: string, userId: string) {
    const user = await this.userModel.findById(userId);
    await this.model.findOneAndUpdate({ _id: boardId }, { $push: { members: { user } } }, { new: true });
  }

  async removeUserFromBoard(boardId: string, userId: string) {
    const user = await this.userModel.findById(userId);
    await this.model.findOneAndUpdate({ _id: boardId }, { $pull: { members: { user } } }, { new: true });
  }

  async updateBoardMemberRole(boardId: string, userId: string, role: RoleNames) {
    const { members } = await this.model
      .findOneAndUpdate({ _id: boardId, "members.user": userId }, { $set: { "members.$.role": role } }, { new: true })
      .populate({ path: "members", populate: { path: "user", select: this.userFields.join(" ") } });
    return members.find((member) => (member as any)?.user._id.equals(userId));
  }
}
