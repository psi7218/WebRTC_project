import Image from "next/image";
import icon from "../../../public/assets/discord-mark-white.png";
import { useUserStore } from "@/store/useUserStore";
import { useGetFriends } from "@/hooks/queries/users/useUsers";
interface FriendFilteredTabProps {
  selectedCategory: string;
}
const FriendFilteredTab = ({ selectedCategory }: FriendFilteredTabProps) => {
  const friendIds = useUserStore((state) => state.friendIds);
  const friendQueries = useGetFriends(friendIds);

  const friendList = friendQueries.map((query) => query.data).filter(Boolean); // data가 undefined가 아닌 것만 필터링

  return (
    <div className="w-[60%] h-full border-r border-1 border-gray-600 px-8 pt-2">
      <input
        type="text"
        placeholder="검색"
        className="bg-[#1E1F22] rounded-md w-full h-8 p-3 text-gray-100 outline-none "
      />
      <p className="pt-5 pb-5 text-gray-500">
        모든 친구 - {friendList.length}명
      </p>
      <div className="flex flex-col">
        {friendList.map((friend, idx) => (
          <div
            key={idx}
            className="flex pt-1 gap-3 border-t border-gray-600 items-center pb-3"
          >
            <div
              style={{ backgroundColor: friend.thumbnailColor }}
              className={`rounded-full size-9 flex items-center justify-center`}
            >
              <Image src={icon} width={24} height={2} alt="" />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-white">{friend.username}</p>
              <p className="text-gray-500">오프라인</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendFilteredTab;
