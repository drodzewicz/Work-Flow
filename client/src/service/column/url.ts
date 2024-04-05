import boardURL from "@/service/board/url";

const columnURL = {
    index: (boardId: string) => `${boardURL.id(boardId)}/columns` as const,
    id: (boardId: string, columnId: string) => `${columnURL.index(boardId)}/${columnId}` as const,
    delete: (boardId: string, columnId: string) => columnURL.id(boardId, columnId),
    update: (boardId: string, columnId: string) => columnURL.id(boardId, columnId),
    move: (boardId: string, columnId: string) => columnURL.id(boardId, columnId),
};

export default columnURL;
