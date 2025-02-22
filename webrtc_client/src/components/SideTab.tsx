"use client";

import Image from "next/image";

import { useState } from "react";
import { Plus } from "lucide-react";
import useCurrentTabStore from "@/store/useCurrentTabStore";
import { ServerProps } from "@/types/type";
import { useRouter } from "next/navigation";
import icon from "../../public/assets/discord-mark-white.png";

import ServerModal from "./modal/ServerModal";
import { useUserStore } from "@/store/useUserStore";
import { useUserServers } from "@/hooks/queries/servers/userServers";
import ServerThumbnail from "./server/ServerThumbnail";

const SideTab = () => {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const username = useUserStore((state) => state.username);

  const { data: serverList } = useUserServers(userId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setCurrentViewingTab, setCurrentServer } = useCurrentTabStore();
  const currentViewingTab = useCurrentTabStore(
    (state) => state.currentViewingTab
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const gotoDMTab = () => {
    setCurrentViewingTab(null);
    setCurrentServer(null);
    router.push("/channels/me");
  };

  const gotoSpecificServer = (server: ServerProps) => {
    const defaultchannel = server.channels[0];
    setCurrentViewingTab(defaultchannel["channelId"]);
    setCurrentServer(server);
    router.push(
      "/channels/" + server.serverId + "/" + defaultchannel["channelId"]
    );
  };

  return (
    <div className="min-h-screen">
      <div
        className={`min-h-[10%] min-w-full flex justify-center items-center h-16 
          ${
            currentViewingTab === null
              ? "bg-blue-500 rounded-2xl"
              : "bg-[#363940] rounded-full hover:bg-blue-500 hover:rounded-2xl"
          } transition-all duration-200`}
        style={{ transform: "scale(0.8)" }}
        onClick={() => gotoDMTab()}
      >
        <Image
          src={icon}
          alt="icon"
          className="w-12 h-9 object-cover rounded-full overflow-hidden duration-200"
          width={8}
          height={8}
          unoptimized
        />
      </div>

      <div className="min-h-[90%] flex flex-col gap-2 mt-4 justify-center items-center">
        {serverList?.map((server: ServerProps) => (
          <ServerThumbnail
            key={server.serverId}
            server={server}
            isActive={server.channels.some(
              (channel) => channel.channelId === currentViewingTab
            )}
            onClick={() => gotoSpecificServer(server)}
          />
        ))}
        <div className="group relative">
          <div
            className="w-12 h-12 text-white rounded-full group-hover:rounded-2xl bg-[#363940] group-hover:bg-[#077708] overflow-hidden whitespace-nowrap flex items-center justify-center transition-all duration-200"
            onClick={openModal}
          >
            <Plus
              size={24}
              className="stroke-green group-hover:stroke-white transition-colors duration-1"
            />
          </div>

          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 hidden group-hover:block">
            <div className="relative">
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#18191c]" />
              <div className="bg-[#18191c] text-white px-3 py-2 rounded-md whitespace-nowrap text-sm">
                서버 추가하기
              </div>
            </div>
          </div>
        </div>
        <ServerModal
          isOpen={isModalOpen}
          onClose={closeModal}
          username={username}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default SideTab;
