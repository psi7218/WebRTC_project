import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useGetFriends } from "@/hooks/queries/users/useUsers";
import useCurrentTabStore from "@/store/useCurrentTabStore";
import { useInviteUserToServer } from "@/hooks/mutations/servers/useInviteUserToServer";

interface InvitingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InviteStatus {
  [key: number]: "idle" | "pending" | "completed";
}

const InvitingModal = ({ isOpen, onClose }: InvitingModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteStatus, setInviteStatus] = useState<InviteStatus>({});

  const friendIds = useUserStore((state) => state.friendIds);
  const currentServer = useCurrentTabStore((state) => state.currentServer);
  const friendQueries = useGetFriends(friendIds);
  const inviteMutation = useInviteUserToServer();

  useEffect(() => {
    if (!isOpen) {
      setInviteStatus({});
    }
  }, [isOpen]);

  // 친구 목록 필터링
  const friendList = friendQueries
    .map((query) => query.data)
    .filter(Boolean)
    .filter((friend) =>
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleInvite = (userId: number) => {
    if (!currentServer?.serverId) return;

    inviteMutation.mutate({
      userId,
      serverId: currentServer.serverId,
      onStatusChange: (userId, status) => {
        setInviteStatus((prev) => ({
          ...prev,
          [userId]: status,
        }));
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-[#313338] rounded-md w-[440px] max-h-[660px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#3f4147]">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-lg font-semibold">
              친구를 서버로 초대하기
            </h2>
            <button
              onClick={onClose}
              className="text-[#b5bac1] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[#b5bac1] text-sm mt-1">
            # {currentServer?.serverName}
          </p>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="친구 찾기"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1f22] text-white rounded p-2 pl-8 outline-none"
            />
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-[#b5bac1]" />
          </div>
        </div>

        {/* Friend List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-2">
            {friendList.map((friend) => (
              <div
                key={friend.userId}
                className="flex items-center justify-between p-2 hover:bg-[#35373C] rounded"
              >
                <div className="flex items-center gap-3">
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
                <button
                  onClick={() => handleInvite(friend.userId)}
                  disabled={inviteStatus[friend.userId] === "completed"}
                  className={`px-3 py-1 rounded text-sm ${
                    inviteStatus[friend.userId] === "completed"
                      ? "bg-[#3ba55c] text-white cursor-default"
                      : inviteStatus[friend.userId] === "pending"
                      ? "bg-[#4f545c] text-white cursor-wait"
                      : "bg-[#5865f2] text-white hover:bg-[#4752c4]"
                  }`}
                >
                  {inviteStatus[friend.userId] === "completed"
                    ? "전송됨"
                    : inviteStatus[friend.userId] === "pending"
                    ? "전송중..."
                    : "초대"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitingModal;
