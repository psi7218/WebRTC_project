import { useUserStore } from "@/store/useUserStore";
import ChatInput from "./ChatInput";
import ChattingUpperDiv from "./ChattingUpperDiv";
import MessageList from "./MessageList";
import { useState, useEffect, useRef } from "react";
import { useWebSocketStore } from "@/store/useWebSocketStore";

const ChattingMainDiv = ({ participantsData }) => {
  const channelId = useWebSocketStore((state) => state.channelId);
  const stompClient = useWebSocketStore((state) => state.stompClient);

  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#313338] text-white">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-5 min-h-full flex flex-col justify-end">
          <div className="space-y-8">
            <ChattingUpperDiv participantsData={participantsData} />
            <MessageList
              channelId={channelId}
              messages={messages}
              setMessages={setMessages}
              stompClient={stompClient}
            />
          </div>
          <div ref={messageEndRef} />
        </div>
      </div>

      <div className="flex-none p-4 border-t border-gray-600">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChattingMainDiv;
