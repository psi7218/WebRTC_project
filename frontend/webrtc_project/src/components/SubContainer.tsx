// 전역변수 관리를 통해서 dm 컨테이너와 채널목록 컨테이너 분기

import Lobby from "./Lobby";

const SubContainer = () => {
  return (
    <div className="p-2">
      <Lobby />
    </div>
  );
};
export default SubContainer;
