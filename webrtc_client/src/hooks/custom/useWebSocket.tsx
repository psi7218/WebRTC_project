import { useEffect } from "react";
import { useWebSocketStore } from "@/store/useWebsocketStore";

const useWebSocket = (channelId: number) => {
  const { connect, disconnect } = useWebSocketStore();

  useEffect(() => {
    connect(channelId);
    return () => {
      disconnect();
    };
  }, [channelId, connect, disconnect]);
};

export default useWebSocket;
