const paginateContent = require("../helper/pagination");
const requiredValues = require("../helper/requiredValues");

module.exports = ({ MembersRepository, BoardRepository, NotificationRepository }) => {
  async function getBoardMembers(boardId, pagination, username) {
    let boardMembers = await MembersRepository.getMembers(boardId);

    if (boardMembers.length > 0 && !!username) {
      boardMembers = boardMembers.filter(({ user }) =>
        user.username.toLowerCase().includes(username.toLowerCase())
      );
    }
    if (!!pagination && !!pagination.page && !!pagination.limit) {
      const { page, limit } = pagination;
      const { items, next, prev, totalPageCount } = paginateContent(boardMembers, page, limit);
      return { members: items, next, prev, totalPageCount };
    }
    return { members: boardMembers };
  }
  async function getBoardMember(boardId, userId) {
    const userFields = "_id username avatarImageURL name surnam email"
    const boardMembers = await MembersRepository.getMembers(boardId, userFields);
    const member = boardMembers.find(
      ({ user }) => user._id.toLocaleString() === userId.toLocaleString()
    );
    if (!member) {
      // TODO throw new ResponseError({ member: "member with given id is not a part of this board" }, 404);
    }
    return member;
  }
  async function removeUserFromBoard(boardId, userId) {
    return await MembersRepository.removeMember(boardId, userId);
  }
  async function addUserToBoard(boardId, userId) {
    await MembersRepository.addMember(boardId, userId);
    const foundBoard = await BoardRepository.get(boardId);
    const notification = {
      title: foundBoard.name,
      info: "you have been added to the board",
      url: `/board/${boardId}`,
    };
    await NotificationRepository.addNotification(userId, notification);
  }
  async function changeUserRole(boardId, userId, newRole) {
    requiredValues(["newRole"], { newRole });
    await MembersRepository.updateMemberRole(boardId, userId, newRole);
    const foundBoard = await BoardRepository.get(boardId, "name");
    const notification = {
      title: foundBoard.name,
      info: `assigned new role - ${newRole}`,
      url: `/board/${boardId}`,
    };
    await NotificationRepository.addNotification(userId, notification);
  }

  return {
    getBoardMembers,
    getBoardMember,
    removeUserFromBoard,
    addUserToBoard,
    changeUserRole,
  };
};
