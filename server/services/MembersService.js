const paginateContent = require("../helper/pagination");
const { ResponseError } = require("../error/");
const requiredValues = require("../helper/requiredValues");

module.exports = (MembersRespoitory, BoardRepository, NotificationRepository) => {
  return {
    getBoardMembers: async (boardId, pagination, username) => {
      let boardMembers = await MembersRespoitory.getMembers(boardId);

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
      return boardMembers;
    },
    getBoardMember: async (boardId, userId) => {
      const { members } = await MembersRespoitory.getMembers(boardId);
      const member = members.find(
        ({ user }) => user._id.toLocaleString() === userId.toLocaleString()
      );
      if (!member) {
        throw new ResponseError(
          { member: "member with given id is not a part of this board" },
          404
        );
      }
      return member;
    },
    removeUserFromBoard: async (boardId, userId) => {
      return await MembersRespoitory.removeMember(boardId, userId);
    },
    addUserToBoard: async (boardId, userId) => {
      await MembersRespoitory.addMember(boardId, userId);
      const foundBoard = await BoardRepository.get(boardId);
      const notification = {
        title: foundBoard.name,
        info: "you have been added to the board",
        url: `/board/${boardId}`,
      };
      await NotificationRepository.addNotification(userId, notification);
    },
    changeUserRole: async (boardId, userId, newRole) => {
      requiredValues(["newRole"], { newRole });
      await MembersRespoitory.updateMemberRole(boardId, userId, newRole);
      const foundBoard = await BoardRepository.get(boardId, "name");
      const notification = {
        title: foundBoard.name,
        info: `assigned new role - ${newRole}`,
        url: `/board/${boardId}`,
      };
      await NotificationRepository.addNotification(userId, notification);
    },
  };
};
