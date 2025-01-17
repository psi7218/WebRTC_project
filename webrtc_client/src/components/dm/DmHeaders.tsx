import { useUserStore } from "@/store/useUserStore";
import StackedThumbnails from "../ui/StackedThumbnails";

const DmHeaders = ({ participantsData }) => {
  const userId = useUserStore((state) => state.userId);
  const others = participantsData.filter(
    (participant) => participant.userId !== userId
  );

  const nicknameString = others.map((p) => p.username).join(", ");

  return (
    <div className="relative flex h-12 pl-5 items-center">
      <StackedThumbnails participants={participantsData} />
      <span className="text-gray-100 text-lg font-bold">{nicknameString}</span>
    </div>
  );
};
export default DmHeaders;
