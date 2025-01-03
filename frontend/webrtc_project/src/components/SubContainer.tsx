"use client";
import { Plus, BellRing } from "lucide-react";
import { friends } from "@/dummydata/data";
import { useState } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";

const SubContainer = () => {
  const [friendList, setFriendList] = useState(friends);

  return (
    <div className="flex flex-col p-2">
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
      <div className="margin-top-2 flex justify-between">
        <p>다이렉트 메세지</p>
        <Plus className="text-white w-5 h-5" />
      </div>
      {friendList.map((friend) => (
        <div key={friend.id} className="flex justify-start gap-2 mg-3">
          <Image src={logo} alt="12" className="w-14 h-10 "></Image>
          <span className="flex justify-center items-center">
            {friend.name}
          </span>
        </div>
      ))}
    </div>
  );
};
export default SubContainer;
