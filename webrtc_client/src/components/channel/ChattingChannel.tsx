import { Hash } from "lucide-react";
import ChatInput from "../chatting/ChatInput";
import useWebSocket from "@/hooks/custom/useWebSocket";
import MessageList from "../chatting/MessageList";
import { useState, useRef, useEffect } from "react";
import { useWebSocketStore } from "@/store/useWebSocketStore";

const ChattingChannel = ({ channelInfo }) => {
  useWebSocket(channelInfo?.channelId);
  const channelId = useWebSocketStore((state) => state.channelId);
  const stompClient = useWebSocketStore((state) => state.stompClient);

  // const messageEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-12 pl-5 items-center gap-2">
        <Hash className="text-[#80848E]" />
        <p className="text-[#DBDEE1] font-bold">{channelInfo.channelName}</p>
      </div>
      <hr className="border-1 border-black border-opacity-20 w-full" />
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col bg-[#313338] text-white">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="p-5 min-h-full flex flex-col justify-end">
              <div className="space-y-8">
                <div>
                  <Hash size={40} className="rounded-full bg-[#41434A]" />

                  <p className="font-bold text-white text-2xl py-3">
                    #{channelInfo.channelName}에 오신걸 환영합니다!
                  </p>
                  <p className="text-s font-thin">
                    #{channelInfo.channelName} 채널의 시작이에요.
                  </p>
                </div>

                <MessageList channelId={channelId} stompClient={stompClient} />
              </div>
            </div>
          </div>

          <div className="flex-none p-5 border-gray-600">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingChannel;
