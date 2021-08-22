const TagRepository = require("../../repositories/TagRepository");
const TagService = require("../../services/TagService");

const tagService = TagService({ TagRepository });

module.exports = {
  getBoardTags: async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const tags = await tagService.getBoardTags(boardId);
      return res.status(200).json({ tags });
    } catch (error) {
      next(error);
    }
  },
  createNewBoardTag: async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const tag = await tagService.createNewBoardTag(boardId, req.body);
      return res.status(200).json({ message: "created new tag", tag });
    } catch (error) {
      next(error);
    }
  },
  deleteBoardTag: async (req, res, next) => {
    try {
      const { boardId, tagId } = req.params;
      await tagService.deleteBoardTag(boardId, tagId);
      return res.status(200).json({ message: "tag deleted" });
    } catch (error) {
      next(error);
    }
  },
  updateTag: async (req, res, next) => {
    try {
      const { tagId } = req.params;
      const tag = await tagService.updateTag(tagId, req.body);

      return res.status(200).json({ message: "tag updated", tag });
    } catch (error) {
      next(error);
    }
  },
};
