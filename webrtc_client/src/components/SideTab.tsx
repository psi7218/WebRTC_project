"use client";

import Image from "next/image";
import { servers } from "@/dummydata/data";
import { useState } from "react";
import { Plus } from "lucide-react";
import useCurrentTab from "@/store/useCurrentTab";
import { ServerProps } from "@/types/type";
import { useRouter } from "next/navigation";

import Modal from "./Modal";

const SideTab = () => {
  const router = useRouter();
  const [serverList, setServerList] = useState(servers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setCurrentServer } = useCurrentTab();

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
        className="min-h-[10%] min-w-full flex justify-center items-center h-20 "
        onClick={() => gotoDMTab()}
      >
        <p className="text-white">ICON</p>
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
        <Modal isOpen={isModalOpen}>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 배경 오버레이 */}
            <div
              className="absolute inset-0 bg-black/60"
              onClick={closeModal}
            />
            {/* 모달 내용 */}
            <div className="relative z-50 bg-[#363940] rounded-md p-6 w-[480px] text-white">
              <h2 className="text-xl font-bold mb-4">서버 만들기</h2>
              <p className="text-gray-400">나만의 서버를 만들어보세요</p>
              {/* 여기에 서버 생성 폼 추가 */}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SideTab;
