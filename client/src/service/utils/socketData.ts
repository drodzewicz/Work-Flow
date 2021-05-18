import { ws } from "config/socket.conf";

interface emitWSParams {
	roomId: string;
	eventName: string;
	token: boolean;
	payload: any;
	res: any;
}

export interface socketServiceParams {
  res?: (response: any) => void;
}

const emitWS = async ({ roomId, eventName, token, payload, res }: emitWSParams) => {
  let userToken = undefined;
  if (!!token) userToken = localStorage.getItem("token");
  ws.emit(eventName, { roomId, token: userToken, payload }, res);
};

export { emitWS };
