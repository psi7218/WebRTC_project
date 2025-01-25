import React from "react";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { getChannelMessages } from "@/apis/messages/messageApi";
import { useUserStore } from "@/store/useUserStore";
import { useMessages } from "@/hooks/queries/messages/useMessages";

const MessageList = ({ channelId, stompClient }) => {
  const userId = useUserStore((state) => state.userId);
  const username = useUserStore((state) => state.username);
  // const thumbnailColor = useUserStore((state) => state.thumbnailColor);
  const { messages, isLoading, updateMessagesCache } = useMessages(channelId);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!stompClient || !channelId || channelId === -1) return;

    const subscription = stompClient.subscribe(
      `/topic/channel/${channelId}`,
      (message) => {
        const newMessage = JSON.parse(message.body);
        updateMessagesCache(newMessage);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient, channelId, updateMessagesCache]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView(false);
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sortedMessages = Array.isArray(messages) ? [...messages] : [];

  // 날짜별 + 사용자연속 체크를 하면서 렌더링용 배열 구성
  const renderedList = [];
  let prevDate = null;
  let prevUserId = null;

  sortedMessages.forEach((msg) => {
    const msgDate = dayjs(msg.createdAt).format("YYYY-MM-DD");
    const msgTime = dayjs(msg.createdAt).format("HH:mm");

    // 날짜 구분선 필요 여부
    if (msgDate !== prevDate) {
      renderedList.push({
        type: "date",
        date: msgDate,
        key: `date-${msgDate}`,
      });
      prevDate = msgDate;
      prevUserId = null; // 날짜가 바뀌면 사용자 연속도 끊기도록
    }

    const isNewUserBlock = msg.userId !== prevUserId;
    const isMe = msg.userId === userId;

    renderedList.push({
      type: "message",
      message: msg,
      isMe,
      username: isMe ? username : msg.username,
      time: msgTime,
      showProfile: isNewUserBlock,
      key: `message-${msg.messageId}`,
    });

    prevUserId = msg.userId;
  });

  return (
    <div className="space-y-2">
      {renderedList.map((item) => {
        if (item.type === "date") {
          return (
            <div key={item.key} className="text-center text-gray-400 my-2">
              -- {dayjs(item.date).format("YYYY년 M월 D일")} --
            </div>
          );
        } else {
          const { message, time, showProfile, isMe, username } = item;

          return (
            <div key={item.key} className="flex items-start gap-2">
              {showProfile && (
                <div className="w-8 h-8 bg-pink-500 rounded-full text-center text-white flex-shrink-0">
                  {username?.[0]}
                </div>
              )}

              {/* 아바타 공간 유지를 위한 더미 div */}
              {!showProfile && <div className="w-8 flex-shrink-0" />}

              <div className="max-w-xs p-2 rounded-md bg-gray-700">
                {showProfile && (
                  <div
                    className={`text-sm font-semibold mb-1 ${
                      isMe ? "text-blue-300" : "text-pink-300"
                    }`}
                  >
                    {username}
                  </div>
                )}
                <div>{message.content}</div>
                <div className="text-right text-xs mt-1 text-gray-300">
                  {time}
                </div>
              </div>
            </div>
          );
        }
      })}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
