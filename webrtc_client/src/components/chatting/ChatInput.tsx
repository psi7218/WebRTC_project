import { useUserStore } from "@/store/useUserStore";
import { useWebSocketStore } from "@/store/useWebsocketStore";
import React, { useState } from "react";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { stompClient, isConnected, channelId } = useWebSocketStore();
  const userId = useUserStore((state) => state.userId);

  const handleSend = () => {
    if (!text.trim() || !isConnected) return;

    stompClient.send(
      `/app/channel/${channelId}/send`,
      {},
      JSON.stringify({
        userId,
        content: text,
      })
    );
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <textarea
        className="flex-1 p-2 rounded-md bg-gray-700 text-white focus:outline-none resize-none"
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
      />
      <button
        onClick={handleSend}
        disabled={!isConnected}
        className="bg-blue-600 px-4 py-2 rounded-md text-white"
      >
        전송
      </button>
    </div>
  );
};

export default ChatInput;
