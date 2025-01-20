import React from "react";
import dayjs from "dayjs";
import { useWebSocketStore } from "@/store/useWebsocketStore";
import { useState, useEffect } from "react";
import axios from "axios";
import { getChannelMessages } from "@/apis/messages/messageApi";

const MessageList = ({
  channelId,
  participantsData,
  messages,
  setMessages,
}) => {
  const { stompClient } = useWebSocketStore();

  useEffect(() => {
    if (!channelId || channelId === -1) return;
    const fetchMessages = async () => {
      const response = await getChannelMessages(channelId);
      setMessages(response);
    };
    fetchMessages();
  }, [channelId]);

  useEffect(() => {
    if (!stompClient) return;

    const subscription = stompClient.subscribe(
      `/topic/channel/${channelId}`,
      (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, newMessage]);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient, channelId]);

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  // 날짜별 + 사용자연속 체크를 하면서 렌더링용 배열 구성
  const renderedList = [];
  let prevDate = null;
  let prevUserId = null;

  sortedMessages.forEach((msg, index) => {
    const msgDate = dayjs(msg.createdAt).format("YYYY-MM-DD");
    const msgTime = dayjs(msg.createdAt).format("HH:mm");

    // 날짜 구분선 필요 여부
    if (msgDate !== prevDate) {
      renderedList.push({
        type: "date",
        date: msgDate,
      });
      prevDate = msgDate;
      prevUserId = null; // 날짜가 바뀌면 사용자 연속도 끊기도록
    }

    // 사용자 정보 찾기
    const user = participantsData.find((p) => p.userId === msg.userId);

    // 이전 메시지와 userId가 다르면 아바타/이름을 표시하는 블록 생성
    const isNewUserBlock = msg.userId !== prevUserId;
    renderedList.push({
      type: "message",
      message: msg,
      user,
      time: msgTime,
      showProfile: isNewUserBlock,
    });

    prevUserId = msg.userId;
  });

  return (
    <div className="space-y-2">
      {renderedList.map((item, idx) => {
        if (item.type === "date") {
          return (
            <div key={`date-${idx}`} className="text-center text-gray-400 my-2">
              -- {dayjs(item.date).format("YYYY년 M월 D일")} --
            </div>
          );
        } else {
          const { user, message, time, showProfile } = item;
          const isMe = user?.userId === 1; // 예시: 내 userId가 1이라고 가정
          return (
            <div
              key={message.messageId}
              className={`flex ${
                isMe ? "justify-end" : "justify-start"
              } items-start gap-2`}
            >
              {/* 왼쪽(내 메시지가 아닐 때만) 프로필/닉네임 */}
              {!isMe && showProfile && (
                <div className="w-8 h-8 bg-pink-500 rounded-full text-center text-white flex-shrink-0">
                  {user?.username?.[0] || "?"}
                </div>
              )}

              <div
                className={`max-w-xs p-2 rounded-md ${
                  isMe ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {/* 같은 사람이 연속이면 닉네임 생략 가능하지만
                    연속이 아니거나 날짜 바뀌면 닉네임을 보여줄 수도 있음 */}
                {showProfile && !isMe && (
                  <div className="text-sm font-semibold text-pink-300 mb-1">
                    {user?.username}
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
    </div>
  );
};

export default MessageList;
