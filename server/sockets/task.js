const { createTask, deleteTask, moveTask } = require("../service/ws/task");
const getUserFromJWT = require("../helper/getUserFromJWT");

module.exports = (io, socket) => {

	socket.on("createTask", async (data, call) => {
		const { roomId, token, payload } = data;
		const { id, verified } = await getUserFromJWT(token);
		if (verified) {
			const response = await createTask({ boardId: roomId, authorId: id, ...payload });
			if (!response.error) {
				io.in(roomId).emit("createTask", { ...response });
			}
			call(response);
		} else {
			call({ error: true, message: "unauthorized" });
		}
	});

	socket.on("deleteTask", async (data, call) => {
		const { roomId, token, payload } = data;
		const { verified } = await getUserFromJWT(token);
		if(verified) {
			const response = await deleteTask({ boardId: roomId, ...payload });
			if (!response.error) {
				io.in(roomId).emit("deleteTask", response);
			}
			call(response);
		} else {
			call({ error: true, message: "unauthorized" });
		}
	
	});

	socket.on("moveTask", async (data) => {
		const { roomId, token, payload } = data;
		const { verified } = await getUserFromJWT(token);
		if(verified) {
			const response = await moveTask({ boardId: roomId, ...payload });
			if (!response.error) {
				socket.to(roomId).emit("moveTask", response);
			}
		}
		
	});
};
