import { useUserStore } from "@/store/useUserStore";
import BigStackedThumbnails from "../ui/BigStackedThumbnails";

const ChattingUpperDiv = ({ participantsData }) => {
  const userId = useUserStore((state) => state.userId);
  const others = participantsData.filter(
    (participant) => participant.userId !== userId
  );

  const nicknameString = others.map((p) => p.username).join(", ");

  return (
    <div className="">
      <div className="pb-10">
        <BigStackedThumbnails participants={participantsData} />
      </div>

      <div className="">
        <p className="font-bold text-white text-4xl">{nicknameString}</p>
        <span>#{nicknameString} 그룹에 오신걸 환영합니다.</span>
      </div>
    </div>
  );
};

export default ChattingUpperDiv;
