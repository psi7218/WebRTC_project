// 전역변수 관리를 통해서 dm 컨테이너와 채널목록 컨테이너 분기
"use client";
import Lobby from "./Lobby";
import useCurrentTab from "../store/useCurrentTabStore";
import ChannelContainer from "./ChannelContainer";

const SubContainer = () => {
  const { currentServer } = useCurrentTab();

  return (
    <div className="p-2">
      {currentServer ? <ChannelContainer /> : <Lobby />}
    </div>
  );
};
export default SubContainer;
