import { useParams } from "next/navigation";
import { useConnectingVoiceChannel } from "@/hooks/mutations/voiceChannel/useConnectingVoiceChannel";
import { OpenVidu } from "openvidu-browser";
import { useChannelById } from "@/hooks/queries/channels/useChannel";
import { useEffect, useState } from "react";
import { useCurrentVoiceChannel } from "@/stores/useCurrentVoiceChannel";
import VoicePrevDiv from "./VoicePrevDiv";
import VoiceConnectingDiv from "./VoiceConnectingDiv";

const VoiceChannel = () => {
  const params = useParams();
  const channelId = params["channelId"];
  const {
    OV,
    session,
    publisher,
    isConnected,
    setOV,
    setSession,
    setPublisher,
    setIsConnected,
    setVoiceChannel,
    disconnect,
  } = useCurrentVoiceChannel();

  const { data: channelData, isLoading: channelLoading } =
    useChannelById(channelId);
  const { mutate: connectVoiceChannel } = useConnectingVoiceChannel();

  return <>{!isConnected ? <VoicePrevDiv /> : <VoiceConnectingDiv />}</>;
};

export default VoiceChannel;
