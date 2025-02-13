import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { channelKeys } from "@/apis/channel/channelKeys";
import { createDMChannel } from "@/apis/channel/channelApi";
import { useUserStore } from "@/store/useUserStore";
import { useGetFriends } from "@/hooks/queries/users/useUsers";
import { getUserById } from "@/apis/users/userApi";

interface CreateDMModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Friend {
  userId: number;
  username: string;
  email: string;
  friendIds: number[];
  profileImage: string;
  thumbnailColor: string;
}

const CreateDMModal = ({ isOpen, onClose }: CreateDMModalProps) => {
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const friendIds = useUserStore((state) => state.friendIds);
  const { userId: currentUserId, setParticipatingChannelIds } = useUserStore();
  const friendQueries = useGetFriends(friendIds);
  const queryClient = useQueryClient();

  // data가 undefined가 아닌 것만 필터링
  const friendList = friendQueries.map((query) => query.data).filter(Boolean);

  const handleFriendSelect = (userId: number) => {
    setSelectedFriends((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateDM = async () => {
    try {
      if (selectedFriends.length > 0) {
        // 현재 사용자의 ID로 채널을 생성하고, 선택된 친구들을 참가자로 추가
        await createDMChannel(currentUserId, selectedFriends);

        // 현재 사용자의 정보를 다시 가져와서 participatingChannelIds 업데이트
        const userData = await getUserById(currentUserId);
        setParticipatingChannelIds(userData.participatingChannelIds);

        // 채널 목록 갱신
        queryClient.invalidateQueries({ queryKey: channelKeys.all });
        onClose();
      }
    } catch (error) {
      console.error("Error creating DM channel:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#36393f] rounded-lg w-[440px] max-h-[660px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#202225]">
          <h2 className="text-white text-lg font-semibold">친구 선택하기</h2>
          <p className="text-[#b9bbbe] text-sm">
            친구를 3명까지 추가할 수 있어요.
          </p>
        </div>

        {/* Friend List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {friendList.map((friend) => (
              <div
                key={friend.userId}
                className="flex items-center space-x-3 p-2 hover:bg-[#32353b] rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedFriends.includes(friend.userId)}
                  onChange={(e) => {
                    e.stopPropagation(); // 이벤트 버블링 방지
                    handleFriendSelect(friend.userId);
                  }}
                  className="w-4 h-4 rounded border-none bg-[#72767d] checked:bg-[#5865f2]"
                />
                <div
                  onClick={() => handleFriendSelect(friend.userId)}
                  className="flex items-center space-x-3 flex-1"
                >
                  <div
                    style={{ backgroundColor: friend.thumbnailColor }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-sm">
                      {friend.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white">{friend.username}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#202225] flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white hover:underline"
          >
            취소
          </button>
          <button
            onClick={handleCreateDM}
            disabled={selectedFriends.length === 0}
            className={`px-4 py-2 rounded ${
              selectedFriends.length === 0
                ? "bg-[#4f545c] cursor-not-allowed"
                : "bg-[#5865f2] hover:bg-[#4752c4]"
            } text-white`}
          >
            DM 생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDMModal;
