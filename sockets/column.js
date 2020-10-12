const { createColumn, deleteColumn, moveColumn } = require("../service/ws/column");

module.exports = (io, socket) => {

	socket.on("createNewColumn", async (data, call) => {
		const { roomId, token, payload } = data;

		const response = await createColumn({ boardId: roomId, ...payload });
		if (!response.error) {
			io.in(roomId).emit("createNewColumn", response.newColumn);
		}
		call(response);
	});

	socket.on("deleteColumn", async (data, call) => {
		const { roomId, token, payload } = data;

		const response = await deleteColumn({ boardId: roomId, ...payload });
		if (!response.error) {
			io.in(roomId).emit("deleteColumn", response);
		}
		call(response);
	});

	socket.on("moveColumn", async (data, call) => {
		const { roomId, token, payload } = data;

		const response = await moveColumn({ boardId: roomId, ...payload });
		if (!response.error) {
			io.in(roomId).emit("moveColumn", response);
		}
		call(response);
	});
};
