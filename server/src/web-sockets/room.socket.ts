import { Socket } from "socket.io";

const roomSocket = (socket: Socket) => {
    socket.on("board-room", (data) => {
        if (!data.roomId) {
            return;
        }
        if (data.type === "JOIN") {
            socket.join(data.roomId);
        } else if (data.type === "LEAVE") {
            socket.leave(data.roomId);
        }
    });
};

export default roomSocket;
