const columnWS = require("./column");
const taskWS = require("./task");
const roomsWS = require("./rooms");

module.exports = (io) => {
  io.on("connection", (socket) => {
    roomsWS(io, socket);
    columnWS(io, socket);
    taskWS(io, socket);
  });
};
