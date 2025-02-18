"use client";

import { useState } from "react";
import { Plus, BellRing, X } from "lucide-react";
import PersonalThumbnail from "./ui/PersonalThumbnail";
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useChannels } from "@/hooks/queries/channels/useChannels";
import { useLeaveChannel } from "@/hooks/mutations/channels/useLeaveChannel";
import clsx from "clsx";
import CreateDMModal from "./modal/CreateDMModal";
import StackedThumbnails from "./ui/StackedThumbnails";

const Lobby = () => {
  const router = useRouter();
  const params = useParams();
  const { participatingChannelIds, userId } = useUserStore();
  const currentDMChannelId = params["chattingRoomId"];
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [hoveredChannelId, setHoveredChannelId] = useState<number | null>(null);

  const channelQueries = useChannels(participatingChannelIds);
  const leaveMutation = useLeaveChannel(currentDMChannelId);

  const channelDataList = channelQueries
    .map((query) => query.data)
    .filter(Boolean); // data가 undefined가 아닌 것만 필터링

  const handleLeaveChannel = (e: React.MouseEvent, channelId: number) => {
    e.stopPropagation(); // 채널 클릭 이벤트 전파 방지
    if (userId) {
      leaveMutation.mutate({ channelId, userId });
    }
  };

  const gotoDMDialog = (channelId: number) => {
    router.push(`/channels/me/${channelId}`);
  };

  const goToFriendTab = () => {
    router.push(`/channels/me`);
  };

  return (
    <>
      <input
        type="text"
        placeholder="대화 찾기 또는 시작하기"
        className="bg-[#1E1F22] text-gray-300 rounded-lg w-full h-8 px-2 outline-none"
      />
      <div className="-mx-2">
        <hr className="my-2 border-t border-black w-full" />
      </div>

      <div
        className={clsx(
          "flex items-center gap-2 px-2 py-2 text-white rounded cursor-pointer w-full h-10",
          currentDMChannelId ? "bg-transparent" : "bg-[#3B3D43]"
        )}
        onClick={goToFriendTab}
      >
        <BellRing className="w-5 h-5" />
        <span className="text-sm">친구</span>
      </div>
      <div className="mt-6 flex justify-between py-3">
        <p className="text-gray-400 text-xs font-bol pl-2">다이렉트 메세지</p>
        <Plus
          className="text-white w-5 h-5 cursor-pointer hover:text-gray-300"
          onClick={() => setIsCreateModalOpen(true)}
        />
      </div>

      <div className="space-y-1">
        {channelDataList.map((channel) => {
          // 숫자로 비교하려면 parseInt로 변환(또는 Number)
          const isActive = channel.channelId === Number(currentDMChannelId);
          const isHovered = channel.channelId === hoveredChannelId;

          const participants = channel.participantIds.map((id) => ({
            userId: id,
            thumbnailColor: channel.logo_color, // 각 참여자의 썸네일 색상
          }));

          return (
            <div
              key={channel.channelId}
              onClick={() => gotoDMDialog(channel.channelId)}
              onMouseEnter={() => setHoveredChannelId(channel.channelId)}
              onMouseLeave={() => setHoveredChannelId(null)}
              className={clsx(
                "flex justify-between items-center mg-3 p-1 cursor-pointer rounded group",
                isActive ? "bg-[#3B3D43] text-white" : "text-[#8E9BA4]",
                isHovered && "bg-[#35373C]"
              )}
            >
              <div className="flex gap-2.5">
                <PersonalThumbnail
                  logo_color={channel.logo_color}
                  thumbnail={channel.thumbnail}
                />
                {/* <StackedThumbnails participants={participants} /> */}
                <span className="flex justify-center items-center">
                  <p>{channel.channelName}</p>
                </span>
              </div>
              {isHovered && (
                <button
                  onClick={(e) => handleLeaveChannel(e, channel.channelId)}
                  className="text-gray-400 hover:text-white mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Create DM Modal */}
      <CreateDMModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default Lobby;
