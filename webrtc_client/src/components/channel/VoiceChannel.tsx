import { useParams } from "next/navigation";
import { useConnectingVoiceChannel } from "@/hooks/mutations/voiceChannel/useConnectingVoiceChannel";
import { OpenVidu } from "openvidu-browser";
import { useChannelById } from "@/hooks/queries/channels/useChannel";
import { useEffect } from "react";
import { useCurrentVoiceChannel } from "@/stores/useCurrentVoiceChannel";
import VoicePrevDiv from "./VoicePrevDiv";
import VoiceConnectingDiv from "./VoiceConnectingDiv";

const VoiceChannel = () => {
  const params = useParams();
  const channelId = params["channelId"];

  const {
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

  const handleConnect = async () => {
    if (!channelId || channelLoading) return;

    try {
      const ovInstance = new OpenVidu();
      setOV(ovInstance);
      setVoiceChannel(channelId);

      connectVoiceChannel(channelId, {
        onSuccess: async (token) => {
          if (!token) {
            console.error("No token received");
            return;
          }

          try {
            const newSession = ovInstance.initSession();

            newSession.on("sessionDisconnected", () => {
              console.log("Session disconnected");
              disconnect();
            });

            await newSession.connect(token, {
              clientData: "MyUserName",
              connectionId: Date.now().toString(),
            });

            const newPublisher = ovInstance.initPublisher(
              "publisher-container",
              {
                publishAudio: true,
                publishVideo: false,
                audioSource: undefined,
                mirror: false,
              }
            );

            await newSession.publish(newPublisher);

            setSession(newSession);
            setPublisher(newPublisher);
            setIsConnected(true);
          } catch (error) {
            console.error("Error in session initialization:", error);
            disconnect();
          }
        },
        onError: (error) => {
          console.error("Error getting token:", error);
          disconnect();
        },
      });
    } catch (error) {
      console.error("Error in OpenVidu initialization:", error);
      disconnect();
    }
  };

  // Cleanup on unmount
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
