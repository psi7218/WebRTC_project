import { useUserStore } from "@/store/useUserStore";
import ChatInput from "./ChatInput";
import ChattingUpperDiv from "./ChattingUpperDiv";
import MessageList from "./MessageList";
import { useState, useEffect, useRef } from "react";

const ChattingMainDiv = ({ participantsData }) => {
  const { userId } = useUserStore((state) => state.userId);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    const newMessage = {
      id: Date.now(), // 임시 ID
      userId,
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-[#313338] text-white">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-5 min-h-full flex flex-col justify-end">
          <div className="space-y-8">
            <ChattingUpperDiv participantsData={participantsData} />
            <MessageList
              messages={messages}
              participantsData={participantsData}
            />
          </div>
          <div ref={messageEndRef} />
        </div>
      </div>

      {/* 하단 고정 입력 영역 */}
      <div className="flex-none p-4 border-t border-gray-600">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChattingMainDiv;
