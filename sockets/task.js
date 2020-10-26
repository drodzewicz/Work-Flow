const { createTask, deleteTask, moveTask } = require("../service/ws/task");

module.exports = (io, socket) => {

	socket.on("createTask", async (data, call) => {
		const { roomId, token, payload } = data;

		const response = await createTask({ boardId: roomId, ...payload });
		if (!response.error) {
			io.in(roomId).emit("createTask", {...response });
		}
		call(response);
	});

	socket.on("deleteTask", async (data, call) => {
		const { roomId, token, payload } = data;
		const response = await deleteTask({ boardId: roomId, ...payload });
		if (!response.error) {
			io.in(roomId).emit("deleteTask", response);
		}
		call(response);
	});

	socket.on("moveTask", async (data) => {
		const { roomId, token, payload } = data;

		const response = await moveTask({ boardId: roomId, ...payload });
		if (!response.error) {
			io.in(roomId).emit("moveTask", response);
		}
	});
};
