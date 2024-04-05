import { Socket } from "socket.io";

const taskSocket = (socket: Socket) => {
    socket.on("task-update", (data: { roomId: string; type: string }) => {
        if (!data.roomId) {
            return;
        }
        socket.in(data.roomId).emit("task-alert", { type: data.type });
    });
};

export default taskSocket;
