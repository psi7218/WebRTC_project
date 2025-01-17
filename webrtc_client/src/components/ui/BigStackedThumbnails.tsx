import { useUserStore } from "@/store/useUserStore";
import white_logo from "../../../public/assets/discord-mark-white.png";
import Image from "next/image";

const BigStackedThumbnails = ({ participants }) => {
  const userId = useUserStore((state) => state.userId);

  const others = participants.filter((p) => p.userId !== userId);
  const getOffsets = (index: number) => {
    const isEven = index % 2 === 0;
    const top = isEven ? 10 : 50; // 짝수: 위(0px), 홀수: 아래(10px)
    const left = index * 35; // index마다 15px씩 오른쪽으로 밀기
    return { top, left };
  };

  return (
    <div className="relative w-40 h-40 " style={{ transform: "scale(0.7)" }}>
      {/* 각각의 썸네일을 absolute로 겹치기 */}
      {others.map((user, index) => {
        const { top, left } = getOffsets(index);

        return (
          <div
            key={user.userId}
            className="absolute w-20 h-20 items-center flex"
            style={{ top, left, width: 80, height: 80 }}
          >
            <div
              style={{ backgroundColor: user.thumbnailColor }}
              className={`rounded-full border-2 border-[#363940] w-20 h-20 flex justify-center items-center overflow-hidden`}
            >
              <Image src={white_logo} alt="기본 로고" className="w-12 h-9" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BigStackedThumbnails;
