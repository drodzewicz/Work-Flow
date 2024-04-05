import { Service, Inject } from "typedi";
import { HttpError, NotFoundError } from "routing-controllers";
import { TagRepository } from "../repositories/index.js";
import { TagDTO } from "../types/dto/index.js";
import { TagMapper } from "../mappers/index.js";
import { Types } from "mongoose";

@Service()
export class TagService {
    @Inject()
    tagRepository: TagRepository;

    async createTag(boardId: string, tagData: { key: string; name: string }): Promise<TagDTO> {
        const tag = await this.tagRepository.getTagByKey(boardId, tagData.key);
        if (tag) {
            throw new HttpError(400, `Tag with key "${tagData.key}" already exists in the board`);
        }
        const newTag = await this.tagRepository.create({
            board: new Types.ObjectId(boardId),
            ...tagData,
        });
        await this.tagRepository.addTagToBoard(boardId, newTag._id.toString());
        return TagMapper(newTag);
    }

    async getTag(tagId: string) {
        const tag = await this.tagRepository.getById(tagId);
        if (!tag) {
            throw new NotFoundError("Tag does not exist");
        }
        return tag;
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

        if (tagData.key) {
            const tagWithSameKey = await this.tagRepository.getTagByKey(
                tag.board.toString(),
                tagData.key
            );

            // if updated key is the same as the current one the ignore the validation
            if (tagWithSameKey && !tag._id.equals(tagWithSameKey._id)) {
                throw new HttpError(
                    400,
                    `Tag with key "${tagData.key}" already exists in the board`
                );
            }
            tag.key = tagData.key;
        }
        const updatedTag = await this.tagRepository.save(tag);
        return TagMapper(updatedTag);
    }
}
