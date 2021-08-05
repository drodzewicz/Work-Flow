module.exports = (TagRepository) => {
  return {
    getBoardTags: async (boardId) => {
      return await TagRepository.getBoardTags(boardId);
    },
    createNewBoardTag: async (boardId, tagData) => {
      const { name, color } = tagData;
      const newTag = await TagRepository.create(name, color);
      await TagRepository.addTagToBoard(boardId, newTag._id);
      return newTag;
    },
    deleteBoardTag: async (boardId, tagId) => {
      await TagRepository.delete(tagId);
      await TagRepository.removeTagfromBoard(boardId, tagId);
    },
    updateTag: async (tagId, tagData) => {
      return await TagRepository.update(tagId, tagData);
    },
  };
};
