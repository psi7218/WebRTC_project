"use client";

import { useParams } from "next/navigation";
import { useChannelById } from "@/hooks/queries/channels/useChannel";
import ChattingChannel from "@/components/channel/ChattingChannel";
import VoiceChannel from "@/components/channel/VoiceChannel";

const ContentContainer = () => {
  const params = useParams();
  const chattingRoomId = params["channelId"];
  const { data: channelInfo } = useChannelById(Number(chattingRoomId));

  return (
    <>
      {channelInfo?.channelType === "CHATTING" ? (
        <ChattingChannel channelInfo={channelInfo} />
      ) : (
        <VoiceChannel />
      )}
    </>
  );
};

export default ContentContainer;
