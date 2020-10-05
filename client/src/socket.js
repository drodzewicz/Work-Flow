import io from "socket.io-client";

const ws = io.connect("http://localhost:8080/")

export { ws }