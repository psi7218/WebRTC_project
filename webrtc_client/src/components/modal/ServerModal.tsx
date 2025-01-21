import React, { useState } from "react";
import { Camera } from "lucide-react";
import { createServer } from "@/apis/servers/serverApi";
interface ServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  userId: number;
}
const ServerModal = ({
  isOpen,
  onClose,
  username,
  userId,
}: ServerModalProps) => {
  const [serverName, setServerName] = useState(`${username}의 서버`);

  if (typeof window === "undefined") return null;
  if (!isOpen) return null;

  const handleServerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerName(e.target.value);
  };

  const handleCreateServer = async () => {
    const data = {
      serverName: serverName,
      serverThumbnail: null,
      serverAdminId: userId,
    };
    await createServer(data);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-50 bg-[#363940] rounded-md w-[480px] text-white">
        <div className="">
          <div className="p-3 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">서버 커스터마이즈하기</h2>
            <p className="text-gray-400 text-center text-lg">
              새로운 서버에 이름과 아이콘을 부여해 개성을 드러내보세요. 나중에
              언제든 바꿀 수 있어요.
            </p>

            <div className="w-20 h-20 bg-[#1E1F22] rounded-full flex items-center justify-center mt-4">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>

            <div className="w-full space-y-2">
              <label className="text-xs text-gray-400 uppercase font-bold">
                서버 이름
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-[#1E1F22] rounded-md text-white"
                value={serverName}
                onChange={handleServerTitle}
              />
            </div>
          </div>

          <div className="flex justify-between items-center w-full h-full p-3 bg-[#2B2D31]">
            <button onClick={onClose} className="text-white hover:underline">
              뒤로 가기
            </button>
            <button
              onClick={handleCreateServer}
              className="bg-blue-500 px-4 py-2 rounded-md text-white"
            >
              만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerModal;
