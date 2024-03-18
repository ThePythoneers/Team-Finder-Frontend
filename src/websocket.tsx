import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

export function WebSocket() {
  const { lastJsonMessage } = useWebSocket("", {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    console.log("test");
  }, [lastJsonMessage]);
  return;
}
