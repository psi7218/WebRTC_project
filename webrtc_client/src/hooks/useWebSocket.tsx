import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";

const useWebSocket = (channelId: number) => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const stompClient = Stomp.over(
      () => new WebSocket("ws://localhost:8080/ws")
    );
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/channel/${channelId}`, (message) => {
        setMessages((prev) => [...prev, JSON.parse(message.body)]);
      });
      setStompClient(stompClient);
    });

    return () => {
      stompClient.disconnect();
    };
  }, [channelId]);
  const sendMessage = (message: { userId: number; content: string }) => {
    if (stompClient) {
      stompClient.send(`/app/channel/${1}/send`, {}, JSON.stringify(message));
    }
  };
  return { messages, sendMessage };
};

export default useWebSocket;
