import { useParams, useRouter } from "next/navigation";
import ChannelDiv from "./ChannelDiv";
import { useChannelsByServerId } from "@/hooks/queries/channels/useChannels";
import { useWebSocketStore } from "@/store/useWebSocketStore";
import useCurrentTabStore from "@/store/useCurrentTabStore";

const ChannelContainer = () => {
  const params = useParams();
  const router = useRouter();
  const serverId = params["serverId"];

  const { data: channelList } = useChannelsByServerId(Number(serverId));
  const currentServer = useCurrentTabStore((state) => state.currentServer);
  const currentViewingTab = useCurrentTabStore(
    (state) => state.currentViewingTab
  );

  console.log(currentViewingTab);

  const { updateChannelId } = useWebSocketStore();

  const chattingChannels = channelList?.filter(
    (channel) => channel.channelType === "CHATTING"
  );

  const vocalChannels = channelList?.filter(
    (channel) => channel.channelType === "VOICE"
  );

  // todo: 채팅채널에 접속할 경우는 지금과 같은 로직
  // 음성채널의 경우, 현재 접속한 음성채널이 null일 경우, 접속만 하고 이동하지 않음
  // 즉, 1번 채팅 채널에 위치하면서 음성 채팅방을 클릭하면 음성(webrtc 시그널링) 서버에 접속하되, channelId는 채팅채널에 그대로
  // 그 상태에서 한번 더 누른다면 그떄는 음성채팅방 channelId로 이동하면서 화면이 전환

  const gotoChannel = (channelId: number) => {
    updateChannelId(channelId);
    router.push(`/channels/${currentServer?.serverId}/${channelId}`);
  };
  return (
    <>
      <div className="text-white w-full h-8 flex items-center pl-2">
        <h1> {currentServer?.serverName}</h1>
      </div>
      <div className="-mx-2">
        <hr className="my-2 border-t border-black w-full" />
      </div>
      <div>
        <ChannelDiv
          channels={chattingChannels}
          gotoChannel={gotoChannel}
          channelType="CHATTING"
        />
        <ChannelDiv
          channels={vocalChannels}
          gotoChannel={gotoChannel}
          channelType="VOICE"
        />
      </div>
    </>
  );
};

export default ChannelContainer;
