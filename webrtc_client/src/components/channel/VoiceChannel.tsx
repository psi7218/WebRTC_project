import { useParams } from "next/navigation";
import { useConnectingVoiceChannel } from "@/hooks/mutations/voiceChannel/useConnectingVoiceChannel";
import { OpenVidu } from "openvidu-browser";
import { useChannelById } from "@/hooks/queries/channels/useChannel";
import { useEffect } from "react";
import { useCurrentVoiceChannel } from "@/stores/useCurrentVoiceChannel";
import VoicePrevDiv from "./VoicePrevDiv";
import VoiceConnectingDiv from "./VoiceConnectingDiv";
import { useUserStore } from "@/store/useUserStore";

const VoiceChannel = () => {
  const params = useParams();
  const channelId = params["channelId"];
  const username = useUserStore((state) => state.username);

  const {
    isConnected,
    setOV,
    setSession,
    setPublisher,
    setIsConnected,
    setVoiceChannel,
    setSubscribers,
    disconnect,
  } = useCurrentVoiceChannel();

  const { data: channelData, isLoading: channelLoading } = useChannelById(
    Number(channelId)
  );
  const { mutateAsync: connectVoiceChannel } = useConnectingVoiceChannel();

  const handleConnect = async () => {
    if (!channelId || channelLoading) return;

    try {
      const ovInstance = new OpenVidu();
      setOV(ovInstance);
      setVoiceChannel(channelId as string);

      const token = await connectVoiceChannel(Number(channelId));

      const newSession = ovInstance.initSession();

      newSession.on("streamCreated", (event) => {
        const subscriber = newSession.subscribe(event.stream, undefined);
        setSubscribers((prev) => [...prev, subscriber]);
      });

      newSession.on("streamDestroyed", (event) => {
        setSubscribers((prev) =>
          prev.filter((sub) => sub.stream.streamId !== event.stream.streamId)
        );
      });

      newSession.on("sessionDisconnected", () => {
        console.log("Session disconnected");
        disconnect();
      });
      await newSession.connect(token, {
        clientData: username,
        connectionId: Date.now().toString(),
      });

      // 6. Publisher 초기화 및 발행
      const newPublisher = await ovInstance.initPublisherAsync(
        "publisher-container",
        {
          publishAudio: true,
          publishVideo: true,
          audioSource: undefined,
          videoSource: undefined,
          mirror: false,
        }
      );

      await newSession.publish(newPublisher);

      setSession(newSession);
      setPublisher(newPublisher);
      setIsConnected(true);
    } catch (error) {
      console.error("Error in OpenVidu initialization:", error);
      disconnect();
    }
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  if (channelLoading) {
    return <div>Loading channel info...</div>;
  }

  return (
    <>
      {!isConnected ? (
        <VoicePrevDiv onConnect={handleConnect} />
      ) : (
        <VoiceConnectingDiv />
      )}
    </>
  );
};

export default VoiceChannel;
