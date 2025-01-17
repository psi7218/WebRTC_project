"use client";
import useWebSocket from "@/hooks/custom/useWebSocket";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/queries/users/useUser";
import DmHeaders from "@/components/dm/DmHeaders";
import PersonalThumbnail from "@/components/ui/PersonalThumbnail";

const DirectMessagePage = () => {
  const params = useParams();
  const friendId = params["chattingRoomId"];

  const { messages, sendMessage } = useWebSocket(1);
  const { data } = useUser(Number(friendId));

  const { userId } = useUserStore();
  const [currentContent, setCurrentContent] = useState<string>(""); // 채팅내용(todo: 첨부파일을 추가할 수 도 있음)

  const handleSendMessage = () => {
    sendMessage({
      userId: userId,
      content: currentContent,
    });
  };
  return (
    <div>
      <DmHeaders />
      <hr className="border-1 border-black border-opacity-20 w-full" />
      {/* <PersonalThumbnail logo_color={"black"} thumbnail={data?.profileImage} /> */}
    </div>
  );
};

export default DirectMessagePage;
