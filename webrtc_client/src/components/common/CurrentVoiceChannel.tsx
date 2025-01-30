import { useCurrentVoiceChannel } from "@/stores/useCurrentVoiceChannel";
import { Bell } from "lucide-react";
// import { MdCallEnd } from "react-icons/md";
import { useChannelById } from "@/hooks/queries/channels/useChannel";

const CurrentVoiceChannel = () => {
  const { channelId, isConnected, disconnect } = useCurrentVoiceChannel();
  const { data: channelData } = useChannelById(channelId || "");

  if (!isConnected || !channelId) {
    return null;
  }

  return (
    <div className="px-3 py-2 bg-[#1e1f22] text-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-300">음성 연결됨</div>
        <div className="text-sm font-medium">{channelData?.name}</div>
      </div>
      <button
        onClick={disconnect}
        className="p-2 hover:bg-red-500 rounded-full transition-colors"
        title="음성 채널 연결 끊기"
      >
        <Bell className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CurrentVoiceChannel;
