"use client";
import useWebSocket from "@/hooks/custom/useWebSocket";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import { useParams } from "next/navigation";

import { useChannel } from "@/hooks/queries/channels/useChannel";
import { useGetFriends } from "@/hooks/queries/users/useUsers";

import DmHeaders from "@/components/dm/DmHeaders";
import ChattingMainDiv from "@/components/chatting/ChattingMainDiv";

const DirectMessagePage = () => {
  const params = useParams();
  const chattingRoodId = params["chattingRoomId"];
  const [currentContent, setCurrentContent] = useState<string>(""); // 채팅내용(todo: 첨부파일을 추가할 수 도 있음)
  // const { messages, sendMessage } = useWebSocket(1);
  const { data: channelData, isLoading: isLoadingChannel } = useChannel(
    Number(chattingRoodId)
  );
  const participantsQueries = useGetFriends(channelData?.participantIds || []);
  const isLoadingParticipants = participantsQueries.some((q) => q.isLoading);
  const participantsData = participantsQueries
    .map((q) => q.data)
    .filter(Boolean);

  if (isLoadingParticipants) {
    return <div>Loading...</div>;
  }

  // const handleSendMessage = () => {
  //   sendMessage({
  //     userId: userId,
  //     content: currentContent,
  //   });
  // };
  return (
    <div>
      <DmHeaders participantsData={participantsData} />
      <hr className="border-1 border-black border-opacity-20 w-full" />
      <ChattingMainDiv participantsData={participantsData} />
    </div>
  );
};

export default DirectMessagePage;
