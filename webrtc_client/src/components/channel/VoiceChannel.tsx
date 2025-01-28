import { useParams } from "next/navigation";
import { useConnectingVoiceChannel } from "@/hooks/mutations/voiceChannel/useConnectingVoiceChannel";
import { OpenVidu } from "openvidu-browser";
import { useChannelById } from "@/hooks/queries/channels/useChannel";
import { useEffect, useState } from "react";

const VoiceChannel = () => {
  const params = useParams();
  const channelId = params["channelId"];

  const { data: channelData, isLoading: channelLoading } =
    useChannelById(channelId);
  const { mutate: connectVoiceChannel, data: tokenData } =
    useConnectingVoiceChannel();
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    if (!channelId || channelLoading || isConnected) return;

    // 만약 컴포넌트가 마운트되면 곧바로 접속 시도하고 싶다면:
    if (channelId && !channelLoading) {
      connectVoiceChannel(channelId, {
        onSuccess: (token) => {
          // (3) tokenData == "ws://localhost:4443?sessionId=...&token=..."
          console.log("Token", token);

          // 여기서 openvidu-browser 라이브러리로 세션 연결
          const OV = new OpenVidu();
          const session = OV.initSession();

          session.on("streamCreated", (event) => {
            const isMyStream =
              event.stream.connection.connectionId ===
              session.connection.connectionId;

            if (!isMyStream) {
              // 남의 스트림만 subscribe
              session.subscribe(event.stream, "subscriber-container");
            }
          });

          // 세션 연결
          session
            .connect(token, { clientData: "MyUserName" })
            .then(() => {
              // Publish (마이크/비디오)
              const publisher = OV.initPublisher("publisher-container", {
                audio: true,
                video: false, // 음성채널이면 false
              });
              session.publish(publisher);
              setIsConnected(true);
            })
            .catch((err) => console.error(err));
        },
        onError: (error) => {
          console.error("Error connecting voice channel:", error);
        },
      });
    }
  }, [channelId, channelLoading, connectVoiceChannel, isConnected]);

  if (channelLoading) {
    return <div>Loading channel info...</div>;
  }

  return (
    <div className="bg-black h-full w-full">
      {/* <h1>Voice Channel: {channelData?.channelName}</h1> */}
      <div id="publisher-container" className="py-10 w-[300px] h-[200px]"></div>
      {/* <div id="subscriber-container"></div> */}
    </div>
  );
};

export default VoiceChannel;
