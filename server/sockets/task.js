const makeTaskController = require("../controllers/ws/TaskController");

module.exports = (io, socket) => {

	const taskController = makeTaskController(io, socket);

	socket.on("createTask", taskController.createTask);

	socket.on("deleteTask", taskController.deleteTask);

	socket.on("moveTask", taskController.moveTask);

};
