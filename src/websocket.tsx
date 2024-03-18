import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { BASE_URL } from "./api/URL";
// import { useQuery } from "@tanstack/react-query";

export function WebSocket() {
  const { lastJsonMessage } = useWebSocket(`${BASE_URL}/ws`, {
    share: false,
    shouldReconnect: () => true,
  });

  // const {data: notifications, isLoading} = useQuery({
  //   queryKey: ["userNotifications"],
  //   queryFn: () => 
  // })

  useEffect(() => {
    console.log("test");
  }, [lastJsonMessage]);
  return <></>;
}
