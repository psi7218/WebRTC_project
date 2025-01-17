import { useUserStore } from "@/store/useUserStore";
import BigStackedThumbnails from "../ui/BigStackedThumbnails";

const ChattingUpperDiv = ({ participantsData }) => {
  const userId = useUserStore((state) => state.userId);
  const others = participantsData.filter(
    (participant) => participant.userId !== userId
  );

  const nicknameString = others.map((p) => p.username).join(", ");

  return (
    <div>
      <BigStackedThumbnails participants={participantsData} />
      <p className="px-8 font-bold text-white text-4xl">{nicknameString}</p>
    </div>
  );
};

export default ChattingUpperDiv;
