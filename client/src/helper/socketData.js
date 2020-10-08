import { ws } from "socket";

const emitWS = async ({ roomId, eventName, token, payload, res }) => {
	let userToken = undefined;
	if (!!token) userToken = localStorage.getItem("token");
	ws.emit(eventName, { roomId, token: userToken, payload }, res);
};

export { emitWS };
