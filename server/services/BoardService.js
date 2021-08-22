const paginateContent = require("../helper/pagination");

module.exports = function ({ BoardRepository, TaskRepository, TagRepository }) {
  async function createBoard(boardData, authorId) {
    const { name, description } = boardData;
    const members = [{ user: authorId, role: "OWNER" }];
    return await BoardRepository.create({ name, description, members, author: authorId });
  }

  async function updateBoard(boardData, boardId) {
    return await BoardRepository.update(boardId, boardData);
  }

  async function getUserBoards(userId, { page, limit }) {
    const userBoards = await BoardRepository.userBoards(userId);
    const userPinnedBoards = await BoardRepository.userPinnedBoards(userId);

    const parsedBoards = userBoards.map((board) => {
      const isAuthor = board.author.toLocaleString() === userId.toLocaleString();
      const pinned =
        userPinnedBoards.findIndex(({ _id }) => {
          return _id.toLocaleString() === board._id.toLocaleString();
        }) > -1;
      return {
        ...board.toObject(),
        pinned,
        isAuthor,
      };
    });
    if (page && limit) {
      const { items: boards, ...paginationData } = paginateContent(parsedBoards, page, limit);
      return { boards, ...paginationData };
    }
    return { boards: parsedBoards };
  }

  async function getUserPinnedBoards(userId) {
    let pinnedBoards = await BoardRepository.userPinnedBoards(userId);
    pinnedBoards = pinnedBoards.map((board) => ({
      ...board.toObject(),
      pinned: true,
      isAuthor: board.author.toLocaleString() === userId.toLocaleString(),
    }));
    return pinnedBoards;
  }

  async function getBoard(boardId, short = false) {
    const board = await BoardRepository.get(boardId);
    if (short) {
      const { _id, name, description, author } = board;
      return { _id, name, description, author };
    }
    return board;
  }

  async function togglePinBoard(userId, boardId) {
    let pinnedBoards = await BoardRepository.userPinnedBoards(userId);
    const indexOfPinnedBoard =
      pinnedBoards &&
      pinnedBoards.findIndex(
        (pinedBoardId) => pinedBoardId._id.toLocaleString() === boardId.toLocaleString()
      );
    if (indexOfPinnedBoard > -1) {
      await BoardRepository.unpinBoard(userId, boardId);
      return { pinned: false };
    } else {
      await BoardRepository.pinBoard(userId, boardId);
      return { pinned: true };
    }
  }

  async function deleteBoard(boardId) {
    const boardTags = await TagRepository.getBoardTags(boardId);
    const boardTagIds = boardTags.map(({ _id }) => _id);
    await TaskRepository.deleteBoardTasks(boardId);
    await TagRepository.deleteMany(boardTagIds);
    await BoardRepository.delete(boardId);
    await BoardRepository.removeBoardFromusersPinnedList(boardId);
  }

  return {
    getBoard,
    createBoard,
    updateBoard,
    getUserBoards,
    getUserPinnedBoards,
    togglePinBoard,
    deleteBoard,
  };
};
