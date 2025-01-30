import { useParams } from "next/navigation";
import { useCurrentVoiceChannel } from "@/stores/useCurrentVoiceChannel";
import { useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import { useConnectingVoiceChannel } from "@/hooks/mutations/voiceChannel/useConnectingVoiceChannel";
import { useChannelById } from "@/hooks/queries/channels/useChannel";

const VoiceConnectingDiv = () => {
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

  useEffect(() => {
    const ovInstance = new OpenVidu();
    setOV(ovInstance);
    if (channelId) {
      setVoiceChannel(channelId);
    }

    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (!channelId || channelLoading || isConnected || !OV) return;

    connectVoiceChannel(channelId, {
      onSuccess: async (token) => {
        if (!token) {
          console.error("No token received");
          return;
        }

        try {
          const newSession = OV.initSession();

          newSession.on("sessionDisconnected", () => {
            console.log("Session disconnected");
            setIsConnected(false);
          });

          newSession.on("connectionDestroyed", () => {
            console.log("Connection destroyed");
          });

          setSession(newSession);

          await newSession.connect(token, {
            clientData: "MyUserName",
            connectionId: Date.now().toString(),
          });

          const newPublisher = OV.initPublisher("publisher-container", {
            publishAudio: true,
            publishVideo: false,
            audioSource: undefined,
            mirror: false,
          });

          await newSession.publish(newPublisher);
          setPublisher(newPublisher);
          setIsConnected(true);
        } catch (error) {
          console.error("Error initializing OpenVidu:", error);
          setIsConnected(false);
        }
      },
      onError: (error) => {
        console.error("Error getting token:", error);
        setIsConnected(false);
      },
    });
  }, [channelId, channelLoading, connectVoiceChannel, isConnected, OV]);

  if (channelLoading) {
    return <div>Loading channel info...</div>;
  }

  return (
    <div className="h-full w-full flex flex-col bg-[#363940]">
      <div className="flex-1 h-[calc(100vh-56px)] overflow-hidden">
        <div className="p-4 h-full">
          <div
            id="publisher-container"
            className="bg-gray-800 rounded-sm aspect-video flex items-center justify-center"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VoiceConnectingDiv;
