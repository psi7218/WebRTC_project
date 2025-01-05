import useCurrentTab from "@/store/useCurrentTab";
import {
  Volume2Icon,
  HashIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";

const ChannelContainer = () => {
  const { currentServer } = useCurrentTab();

  const chattingChannels = currentServer?.channels.filter(
    (channel) => channel.type === "chatting"
  );

  const vocalChannels = currentServer?.channels.filter(
    (channel) => channel.type === "voice"
  );
  return (
    <>
      <div className="text-white w-full h-8 flex items-center pl-2">
        <h1> {currentServer?.name}</h1>
      </div>
      <div className="-mx-2">
        <hr className="my-2 border-t border-black w-full" />
      </div>
      <div>
        <div className="text-white w-full h-8 flex items-center pl-2">
          <ChevronRightIcon size={16} />
          <h1>채팅 채널</h1>
        </div>
        <div className="flex flex-col">
          {chattingChannels?.map((channel) => (
            <div
              key={channel.id}
              className="text-white w-full h-8 flex items-center pl-2 gap-2 "
            >
              <HashIcon size={16} />
              <h1>{channel.name}</h1>
            </div>
          ))}
        </div>

        <div>
          <div className="text-white w-full h-8 flex items-center pl-2">
            <ChevronRightIcon size={16} />
            <h1>음성 채널</h1>
          </div>
          <div className="flex flex-col">
            {vocalChannels?.map((channel) => (
              <div
                key={channel.id}
                className="text-white w-full h-8 flex items-center pl-2 gap-2"
              >
                <Volume2Icon size={16} />
                <h1>{channel.name}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelContainer;
