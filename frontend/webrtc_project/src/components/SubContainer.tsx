// 전역변수 관리를 통해서 dm 컨테이너와 채널목록 컨테이너 분기

import Lobby from "./Lobby";
import useCurrentTab from "../store/useCurrentTab";
import ChannelContainer from "./ChannelContainer";

const SubContainer = () => {
  const { isServerTab } = useCurrentTab();

  return (
    <div className="p-2">{isServerTab ? <Lobby /> : <ChannelContainer />}</div>
  );
};
export default SubContainer;
