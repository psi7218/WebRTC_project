"use client";

import { useState } from "react";
import { friends } from "@/dummydata/data";

import { Plus, BellRing } from "lucide-react";
import PersonalThumbnail from "./ui/PersonalThumbnail";
import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/queries/users/useUsers";

const Lobby = () => {
  const [friendList, setFriendList] = useState(friends);
  const router = useRouter();

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
      <div className="mt-6 flex justify-between">
        <p className="text-white ">다이렉트 메세지</p>
        <Plus className="text-white w-5 h-5" />
      </div>

      <div className="space-y-1">
        {friendList.map((friend) => (
          <div
            key={friend.id}
            className="flex justify-start mg-3 gap-2.5 p-1"
            onClick={() => gotoDMDialog(friend.id)}
          >
            <PersonalThumbnail
              logo_color={friend.logo_color}
              thumbnail={friend.thumbnail}
            />
            <span className="flex justify-center items-center">
              <p className="text-[#8E9BA4]">{friend.name}</p>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Lobby;
