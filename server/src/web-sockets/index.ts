import RoomSocket from "./room.socket.js";
import TaskSocket from "./task.socket.js";
import ColumnSocket from "./column.socket.js";

const sockets = [RoomSocket, TaskSocket, ColumnSocket];

export { sockets };
