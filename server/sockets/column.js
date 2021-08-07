const makeColumnController = require("../controllers/ws/ColumnController");

module.exports = (io, socket) => {

	const columnController = makeColumnController(io, socket);

	socket.on("createNewColumn", columnController.createColumn);

	socket.on("deleteColumn", columnController.deleteColumn);

	socket.on("moveColumn", columnController.moveColumn);
};
