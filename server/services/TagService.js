module.exports = function ({ TagRepository }) {
  async function getBoardTags(boardId) {
    return await TagRepository.getBoardTags(boardId);
  }
  async function createNewBoardTag(boardId, tagData) {
    const { name, color } = tagData;
    const newTag = await TagRepository.create(name, color);
    await TagRepository.addTagToBoard(boardId, newTag._id);
    return newTag;
  }
  async function deleteBoardTag(boardId, tagId) {
    await TagRepository.delete(tagId);
    await TagRepository.removeTagfromBoard(boardId, tagId);
  }
  async function updateTag(tagId, tagData) {
    return await TagRepository.update(tagId, tagData);
  }
  return {
    getBoardTags,
    createNewBoardTag,
    deleteBoardTag,
    updateTag,
  };
};
