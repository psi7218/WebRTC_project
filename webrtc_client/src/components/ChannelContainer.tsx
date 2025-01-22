import useCurrentTab from "@/store/useCurrentTabStore";

import { useParams, useRouter } from "next/navigation";
import ChannelDiv from "./ChannelDiv";
import { useChannelsByServerId } from "@/hooks/queries/channels/useChannels";
import { useWebSocketStore } from "@/store/useWebSocketStore";

const ChannelContainer = () => {
  const params = useParams();
  const serverId = params["serverId"];

  const { data: channelList } = useChannelsByServerId(Number(serverId));
  const { currentServer } = useCurrentTab();
  const router = useRouter();
  const { updateChannelId } = useWebSocketStore();

  const chattingChannels = channelList?.filter(
    (channel) => channel.channelType === "CHATTING"
  );

  const vocalChannels = channelList?.filter(
    (channel) => channel.channelType === "VOICE"
  );

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
