import useCurrentTab from "@/store/useCurrentTabStore";

import { useRouter } from "next/navigation";
import ChannelDiv from "./ChannelDiv";

const ChannelContainer = () => {
  const { currentServer } = useCurrentTab();
  const router = useRouter();
  const chattingChannels = currentServer?.channels.filter(
    (channel) => channel.type === "chatting"
  );

  const vocalChannels = currentServer?.channels.filter(
    (channel) => channel.type === "voice"
  );

  const gotoChannel = (channelId: number) => {
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
          channelType="chatting"
        />
        <ChannelDiv
          channels={vocalChannels}
          gotoChannel={gotoChannel}
          channelType="voice"
        />
      </div>
    </>
  );
};

export default ChannelContainer;
