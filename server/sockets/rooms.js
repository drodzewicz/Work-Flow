
module.exports = (io, socket) => {
	socket.on("joinBoardRoom", (data) => {
		socket.join(data.room);
	});
	socket.on("leaveBoardRoom", (data) => {
		socket.leave(data.room);
	});

};
