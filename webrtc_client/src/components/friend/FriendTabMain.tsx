import { useState } from "react";
import { friends } from "@/dummydata/data";
import icon from "../../../public/assets/discord-mark-white.png";
import Image from "next/image";

interface FriendTabMainProps {
  selectedCategory: string;
}

const FrienTabMain = ({ selectedCategory }: FriendTabMainProps) => {
  const [keyword, setKeyword] = useState("");
  const friendlist = friends;

  return (
    <div className="flex h-[91%]">
      <div className="w-[60%] h-full border-r border-1 border-gray-600 px-8 pt-2">
        <input
          type="text"
          placeholder="검색"
          className="bg-[#1E1F22] rounded-md w-full h-8 p-3 text-gray-100 outline-none "
        />
        <p className="pt-5 pb-5 text-gray-500">
          모든 친구 - {friendlist.length}명
        </p>
        <div className="flex flex-col">
          {friendlist.map((friend, idx) => (
            <div
              key={idx}
              className="flex pt-1 gap-3 border-t border-gray-600 items-center pb-3"
            >
              <div
                className={`bg-${friend.logo_color} rounded-full size-9 flex items-center justify-center`}
              >
                <Image src={icon} width={24} height={2} alt="" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-white">{friend.name}</p>
                <p className="text-gray-500">오프라인</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[40%] h-full">
        <p className="text-white font-semibold pt-2 px-5 text-xl">
          현재 활동중
        </p>
        <div className="flex flex-col items-center justify-center h-[20%] text-gray-400">
          <p className="text-lg">지금은 조용하네요...</p>
          <p className="text-sm mt-2 text-center px-4">
            친구가 게임이나 음성 채팅과 같은 활동을 시작하면 여기에 표시돼요!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrienTabMain;
