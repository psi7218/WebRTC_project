// 전역변수 관리를 통해서 dm 컨테이너와 채널목록 컨테이너 분기
"use client";
import Lobby from "./Lobby";
import useCurrentTab from "../store/useCurrentTabStore";
import ChannelContainer from "./ChannelContainer";
import { useUserStore } from "@/store/useUserStore";
import PersonalThumbnail from "./ui/PersonalThumbnail";

const SubContainer = () => {
  const userId = useUserStore((state) => state.userId);
  const logo_color = useUserStore((state) => state.thumbnailColor);
  const username = useUserStore((state) => state.username);
  const { currentServer } = useCurrentTab();

  return (
    <div className="h-full flex flex-col">
      <div className="h-[90%] p-2">
        {currentServer ? <ChannelContainer /> : <Lobby />}
      </div>
      <div className="h-[10%] flex flex-col">
        {userId && (
          <div className="bg-[#232428] h-full flex items-center pl-2">
            <PersonalThumbnail logo_color={logo_color} thumbnail="" />
            <div className="pl-2">
              <p className="text-white">{username}</p>
              <p className="text-white">온라인</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SubContainer;
