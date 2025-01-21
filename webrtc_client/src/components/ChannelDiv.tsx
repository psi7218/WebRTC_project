import {
  ChevronRightIcon,
  ChevronDownIcon,
  HashIcon,
  Volume2Icon,
} from "lucide-react";
import { ChannelProps } from "@/types/type";
import { useState } from "react";

interface ChannelDivProps {
  channels?: ChannelProps[];
  gotoChannel: (channelId: number) => void;
  channelType: string;
}
const ChannelDiv: React.FC<ChannelDivProps> = ({
  channels,
  gotoChannel,
  channelType,
}) => {
  const channelKind = channelType === "chatting" ? "채팅 채널" : "음성 채널";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="text-white w-full h-8 flex items-center pl-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDownIcon size={16} />
        ) : (
          <ChevronRightIcon size={16} />
        )}
        <h1>{channelKind}</h1>
      </div>
      <div className="flex flex-col">
        {channels?.map((channel) => (
          <div
            key={channel.channelId}
            className="text-white w-full h-8 flex items-center pl-2 gap-2 "
            onClick={() => gotoChannel(channel.channelId)}
          >
            {channelKind === "채팅 채널" ? (
              <HashIcon size={16} />
            ) : (
              <Volume2Icon size={16} />
            )}
            <h1>{channel.channelName}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChannelDiv;
