"use client";
import useWebSocket from "@/hooks/useWebSocket";
import { useParams } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const DirectMessagePage = () => {
  const channelId = useParams();
  console.log(channelId);
  const { messages, sendMessage } = useWebSocket(1);
  const { userId } = useUserStore();
  console.log(userId);
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
