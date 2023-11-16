// import boardURL from "@/service/board/url";

const permissionURL = {
  permissions: "/permissions" as const,
  boardRoles: (boardId: string) => `/boards/${boardId}/roles` as const,
  updateMemberRole: (boardId: string, userId: string) =>
    `/boards/${boardId}/members/${userId}/role` as const,
  userBoardRole: (boardId: string, userId: string) =>
    `/boards/${boardId}/permissions/${userId}` as const,
};

export default permissionURL;
