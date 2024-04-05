import { useEffect } from "react";

import { emitWebSocket } from "@/service/utils/emitWebSocket";

const useWebSocketRoom = (boardId: string) => {
    useEffect(() => {
        emitWebSocket(boardId, { event: "board-room", type: "JOIN" });

        return () => {
            emitWebSocket(boardId, { event: "board-room", type: "LEAVE" });
        };
    }, [boardId]);
};

export default useWebSocketRoom;
