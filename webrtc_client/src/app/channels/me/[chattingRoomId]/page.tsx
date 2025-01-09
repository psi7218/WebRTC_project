"use client";
import useWebSocket from "@/hooks/useWebSocket";
import { useParams } from "next/navigation";

const DirectMessagePage = () => {
  const channelId = useParams();
  const { messages, sendMessage } = useWebSocket(1);

  const handleSendMessage = () => {
    sendMessage({
      userId: 1,
      content: "Hello, World!",
    });
  };
  return (
    <div>
      <h1 onClick={handleSendMessage}>채팅방</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default DirectMessagePage;
