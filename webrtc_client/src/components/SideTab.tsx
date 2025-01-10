"use client";

import Image from "next/image";
import { servers } from "@/dummydata/data";
import { useState } from "react";
import { Plus } from "lucide-react";
import useCurrentTabStore from "@/store/useCurrentTabStore";
import { ServerProps } from "@/types/type";
import { useRouter } from "next/navigation";
import icon from "../../public/assets/discord-mark-white.png";

import ServerModal from "./modal/ServerModal";

const SideTab = () => {
  const router = useRouter();
  const [serverList, setServerList] = useState(servers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setCurrentServer } = useCurrentTabStore();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const gotoDMTab = () => {
    setCurrentServer(null);
    router.push("/channels/me");
  };

  const gotoSpecificServer = (server: ServerProps) => {
    setCurrentServer(server);

    const defaultchannel = server.channels[0];

    router.push(
      "/channels/" + server.serverId + "/" + defaultchannel["channelId"]
    );
  };
  return (
    <div className="min-h-screen">
      <div
        className="min-h-[10%] min-w-full flex justify-center items-center h-16 bg-blue-500 rounded-3xl"
        style={{ transform: "scale(0.8)" }}
        onClick={() => gotoDMTab()}
      >
        <Image
          src={icon}
          alt="icon"
          className="w-12 h-9 object-cover rounded-full overflow-hidden"
          width={8}
          height={8}
          unoptimized
        />
      </div>

      <div className="min-h-[90%] flex flex-col gap-2 mt-4 justify-center items-center">
        {serverList.map((server: ServerProps) => (
          <span
            key={server.serverId}
            className=""
            onClick={() => gotoSpecificServer(server)}
          >
            {server.image ? (
              <Image
                src={server.image}
                alt={server.serverName}
                className="w-12 h-12 object-cover rounded-full overflow-hidden"
                width={14}
                height={14}
                unoptimized
              ></Image>
            ) : (
              <div className="w-12 h-12 text-white rounded-full bg-[#363940] overflow-hidden whitespace-nowrap flex items-center justify-center">
                {server.serverName}
              </div>
            )}
          </span>
        ))}
        <div
          className="w-12 h-12 text-white rounded-full bg-[#363940] overflow-hidden whitespace-nowrap flex items-center justify-center"
          onClick={openModal}
        >
          <Plus size={24} color="green" />
        </div>
        <ServerModal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">서버 만들기</h2>
          <p className="text-gray-400">나만의 서버를 만들어보세요</p>
        </ServerModal>
      </div>
    </div>
  );
};

export default SideTab;
