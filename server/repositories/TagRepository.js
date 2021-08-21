const Board = require("../models/board");
const Tag = require("../models/tag");

module.exports = {
  getBoardTags: async (boardId) => {
    const { tags } = await Board.findOne({ _id: boardId }, "tags").populate("tags");
    return tags;
  },
  create: async (tagName, tagColor) => {
    const newTag = new Tag({ name: tagName, color: tagColor });
    return await newTag.save();
  },
  update: async (tagId, tagData) => {
    return await Tag.findOneAndUpdate({ _id: tagId }, { ...tagData }, { new: true });
  },
  delete: async (tagId) => {
    return await Tag.findOneAndDelete({ _id: tagId });
  },
  save: async (tag) => {
    await tag.save();
  },
  deleteMany: async (tags) => {
    await Tag.deleteMany({ _id: { $in: tags } });
  },
  removeTagfromBoard: async (boardId, tagId) => {
    await Board.findOneAndUpdate({ _id: boardId }, { $pull: { tags: tagId } });
  },
  addTagToBoard: async (boardId, tagId) => {
    await Board.findOneAndUpdate({ _id: boardId }, { $push: { tags: tagId } });
  },
};
