import io from "socket.io-client";

const ws = io.connect("/")

export { ws }