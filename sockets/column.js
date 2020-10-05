const { createColumn } = require("../service/ws/column");

module.exports = (io, socket) => {
	socket.on("joinBoardRoom", function (data) {
		console.log("join --- socket");
		socket.join(data.room);
	});
	socket.on("leaveBoardRoom", function (data) {
		console.log("leave --- socket");
		socket.leave(data.room);
	});

	socket.on("createNewColumn", async (data, call) => {
		const { roomId, token, payload  } = data;

		const response = await createColumn({ boardId: roomId, ...payload });
		if (!response.error) {
			io.in(roomId).emit("createNewColumn", response.newColumn);
        }
        call(response);
        
	});
};
