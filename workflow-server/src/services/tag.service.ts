import { Service, Inject } from "typedi";
import { TagRepository } from "../repositories/index.js";
import { TagDTO } from "../types/dto/index.js";
import { TagMapper } from "../mappers/index.js";
import { Types } from "mongoose";

@Service()
export class TagService {
  @Inject()
  tagRepository: TagRepository;

  async createTag(boardId: string, tagData: { key: string; name: string }): Promise<TagDTO> {
    const newTag = await this.tagRepository.create({ board: new Types.ObjectId(boardId), ...tagData });
    await this.tagRepository.addTagToBoard(boardId, newTag._id.toString());
    return TagMapper(newTag);
  }

  async deleteTag(tagId: string): Promise<void> {
    const tag = await this.tagRepository.getById(tagId);
    await this.tagRepository.removeTagFromTasks(tag.board.toString(), tagId);
    await this.tagRepository.removeTagFromBoard(tag.board.toString(), tagId);
    await this.tagRepository.delete(tagId);
  }

  async getBoardTags(boardId: string): Promise<TagDTO[]> {
    const tags = await this.tagRepository.getBoardTags(boardId);
    return tags.map(TagMapper);
  }

  async updateTag(tagId: string, tagData: { key: string; name: string }): Promise<TagDTO> {
    const tag = await this.tagRepository.getById(tagId);
    tag.name = tagData.name || tag.name;
    tag.key = tagData.key || tag.key;
    const updatedTag = await this.tagRepository.save(tag);
    return TagMapper(updatedTag);
  }
}
