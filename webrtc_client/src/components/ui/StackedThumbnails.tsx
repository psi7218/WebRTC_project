import { useUserStore } from "@/store/useUserStore";
import white_logo from "../../../public/assets/discord-mark-white.png";
import Image from "next/image";

const StackedThumbnails = ({ participants }) => {
  const userId = useUserStore((state) => state.userId);
  // 1) 데이터 가공

  const others = participants.filter((p) => p.userId !== userId);

  // 2) 만약 한 명도 없다면(=혼자만 있는 채널)
  if (others.length === 0) {
    return <div className="text-gray-500">나 혼자 있는 그룹</div>;
  }

  const getOffsets = (index: number) => {
    const isEven = index % 2 === 0;
    const top = isEven ? 10 : 20; // 짝수: 위(0px), 홀수: 아래(10px)
    const left = index * 15; // index마다 15px씩 오른쪽으로 밀기
    return { top, left };
  };

  return (
    <div className="relative w-16 h-16 ">
      {/* 각각의 썸네일을 absolute로 겹치기 */}
      {others.map((user, index) => {
        const { top, left } = getOffsets(index);

        return (
          <div
            key={user.userId}
            className="absolute w-8 h-8 items-center flex"
            style={{ top, left, width: 36, height: 36 }}
          >
            <div
              style={{ backgroundColor: user.thumbnailColor }}
              className={`rounded-full border-2 border-[#363940] w-7 h-7 flex justify-center items-center overflow-hidden`}
            >
              <Image src={white_logo} alt="기본 로고" className="w-4 h-3" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default StackedThumbnails;
