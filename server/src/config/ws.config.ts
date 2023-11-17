import http from "http";
import { Server as WSServer, Socket } from "socket.io";

export const useWebSockets = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
  scoketsListeners: ((socket: Socket) => void)[],
) => {
  const io = new WSServer(server, {
    cors: {
      methods: ["GET", "POST"],
      credentials: true,
    },
    allowEIO3: true,
  });

  io.on("connection", (socket) => {
    scoketsListeners.forEach((socketListener) => socketListener(socket));
  });
};
