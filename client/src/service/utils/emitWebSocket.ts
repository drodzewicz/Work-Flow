import { ws } from "@/config/socket.conf";

type EmitActiontype =
  | { event: "task-update"; type: "MOVE" | "CREATE" | "UPDATE" | "DELETE" }
  | { event: "column-update"; type: "MOVE" | "CREATE" | "UPDATE" | "DELETE" }
  | { event: "board-room"; type: "JOIN" | "LEAVE" };

const emitWebSocket = async (
  roomId: string,
  { event, type }: EmitActiontype,
  responseCallback?: (data: unknown) => void
) => {
  ws.emit(event, { type, roomId }, responseCallback);
};

export { emitWebSocket };
