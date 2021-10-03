import { useEffect } from "react";
import { ws } from "config/socket.conf";

type callbackType = (data: any) => void;

const useWebSocketListener = (name: string, callback: callbackType) => {
  useEffect(() => {
    ws.on(name, callback);
    return () => {
      ws.removeListener(name, callback);
    };
  }, [name, callback]);
};

export { useWebSocketListener };
