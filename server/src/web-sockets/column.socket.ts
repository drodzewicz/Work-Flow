import { Socket } from "socket.io";

const columnSocket = (socket: Socket) => {
  socket.on("column-update", (data: { roomId: string; type: string }) => {
    if (!data.roomId) {
      return;
    }
    socket.in(data.roomId).emit("column-alert", { type: data.type });
  });
};

export default columnSocket;
