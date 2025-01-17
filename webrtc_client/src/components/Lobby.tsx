"use client";

import { useState } from "react";
import { friends } from "@/dummydata/data";

import { Plus, BellRing } from "lucide-react";
import PersonalThumbnail from "./ui/PersonalThumbnail";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useChannels } from "@/hooks/queries/channels/useChannels";

const Lobby = () => {
  const [friendList, setFriendList] = useState(friends);
  const router = useRouter();
  const { participatingChannelIds, userId, password } = useUserStore();
  console.log(participatingChannelIds);
  const channelQueries = useChannels(participatingChannelIds);

  const channelDataList = channelQueries
    .map((query) => query.data)
    .filter(Boolean); // data가 undefined가 아닌 것만 필터링
  console.log(channelDataList);
  const gotoDMDialog = (friendId: number) => {
    router.push(`/channels/me/${friendId}`);
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
        className=" flex 
          items-center 
          gap-2 
          px-2 
          py-2 
          bg-[#3B3D43]  /* 선택된(활성) 상태를 가정: 어두운 회색 박스 */
          text-white 
          rounded 
          cursor-pointer
          w-full
          h-10"
      >
        <BellRing className="w-5 h-5" />
        <span className="text-sm">친구</span>
      </div>
      <div className="mt-6 flex justify-between py-3">
        <p className="text-gray-400 text-xs font-bol pl-2">다이렉트 메세지</p>
        <Plus className="text-white w-5 h-5" />
      </div>

      {/* todo: frienList가 아니라 dm리스트로 바꿔야 할듯? */}
      <div className="space-y-1">
        {channelDataList.map((channel) => (
          <div
            key={channel.channelId}
            className="flex justify-start mg-3 gap-2.5 p-1"
            onClick={() => gotoDMDialog(channel.channelId)}
          >
            <PersonalThumbnail
              logo_color={channel.logo_color}
              thumbnail={channel.thumbnail}
            />
            <span className="flex justify-center items-center">
              <p className="text-[#8E9BA4]">{channel.channelName}</p>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Lobby;
