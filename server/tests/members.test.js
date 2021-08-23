const MembersService = require("../services/MembersService");
const mockMembersRepository = require("./mocks/repositories/mockMembersRepository");
const mockBoardRepository = require("./mocks/repositories/mockBoardRepository");
const mockNotificationRepository = require("./mocks/repositories/mockNotificationRepository");
const mockDatabase = require("./mocks/data");

describe("TAG", () => {
  let membersService;
  let MembersRepository;
  let BoardRepository;
  let NotificationRepository;

  beforeEach(() => {
    MembersRepository = mockMembersRepository();
    BoardRepository = mockBoardRepository();
    NotificationRepository = mockNotificationRepository();

    membersService = MembersService({ MembersRepository, BoardRepository, NotificationRepository });
  });

  describe("GET BOARD MEMBERS", () => {
    const boardId = "board_id";

    it("should return all board members", async () => {
      const { members } = await membersService.getBoardMembers(boardId);
      expect(MembersRepository.getMembers).toHaveBeenCalledWith(boardId);
      expect(members.length).toBe(mockDatabase.members.length);
    });

    it("should return a paginated board members list", async () => {
      const pagination = { limit: 2, page: 2 };

      const { members } = await membersService.getBoardMembers(boardId, pagination);
      expect(members.length).toBe(pagination.limit);
    });

    it("should return only members that match a given username", async () => {
      const username = "match";

      const { members } = await membersService.getBoardMembers(boardId, null, username);
      expect(members.length).toBe(2);
      members.forEach(({ user }) => {
        expect(user.username).toMatch(username);
      });
    });
  });

  describe("GET BOARD MEMBER", () => {
    it("should return a found member", async () => {
      const memberId = mockDatabase.members[0].user._id;
      const foundMember = await membersService.getBoardMember("board_id", memberId);
      expect(foundMember).toBeTruthy();
      expect(foundMember.user._id).toBe(memberId);
    });
  });

  describe("ADD USER TO BOARD", () => {
    const boardId = "board_id";
    const userId = "user_id";
    it("should add user to board", async () => {
      await membersService.addUserToBoard(boardId, userId);
      expect(MembersRepository.addMember).toHaveBeenCalledWith(boardId, userId);
    });

    it("should send a notification to the user", async () => {
      await membersService.addUserToBoard(boardId, userId);
      const notificationUserId = NotificationRepository.addNotification.mock.calls[0][0];
      expect(notificationUserId).toBe(userId);
    });
  });

  describe("CHANGE MEMBER ROLE", () => {
    const boardId = "board_id";
    const memberId = "member_id";
    const newRole = "ADMIN";

    it("shoudl update user role", async () => {
      await membersService.changeUserRole(boardId, memberId, newRole);
      expect(MembersRepository.updateMemberRole).toHaveBeenCalledWith(boardId, memberId, newRole);
    });

    it("should send a notification to the user", async () => {
      await membersService.changeUserRole(boardId, memberId, newRole);
      const notificationUserId = NotificationRepository.addNotification.mock.calls[0][0];
      expect(notificationUserId).toBe(memberId);
    });
  });
});
