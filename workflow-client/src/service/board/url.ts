const boardURL = {
  index: "/boards" as const,
  id: (boardId: string) => `${boardURL.index}/${boardId}` as const,
  read: (boardId: string) => boardURL.id(boardId),
  delete: (boardId: string) => boardURL.id(boardId),
  update: (boardId: string) => boardURL.id(boardId),
  leave: (boardId: string) => `${boardURL.id(boardId)}/leave` as const,
};

export default boardURL;
