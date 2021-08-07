const makeTaskController = require("../controllers/ws/TaskController");

module.exports = (io, socket) => {

	const taskController = makeTaskController(io, socket);

	socket.on("createTask", taskController.createTask);

	socket.on("deleteTask", taskController.deleteTask);

	socket.on("moveTask", taskController.moveTask);

	// socket.on("moveTask", async (data) => {
	// 	const { roomId, token, payload } = data;
	// 	const { verified } = await getUserFromJWT(token);
	// 	if(verified) {
	// 		const response = await moveTask({ boardId: roomId, ...payload });
	// 		if (!response.error) {
	// 			socket.to(roomId).emit("moveTask", response);
	// 		}
	// 	}
		
	// });
};
