import boardURL from "@/service/board/url";

const memberURL = {
  index: (boardId: string) => `${boardURL.id(boardId)}/members` as const,
  id: (boardId: string, userId: string) => `${memberURL.index(boardId)}/${userId}` as const,
  add: (boardId: string, userId: string) => memberURL.id(boardId, userId),
  remove: (boardId: string, userId: string) => memberURL.id(boardId, userId),
};

export default memberURL;
