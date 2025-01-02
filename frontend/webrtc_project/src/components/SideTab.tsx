"use client";

import Image from "next/image";
import { channels } from "@/dummydata/data";
import { useState } from "react";
import { Plus } from "lucide-react";

const SideTab = () => {
  const [channelList, setChannelList] = useState(channels);

  return (
    <div className="min-h-screen">
      <div className="min-h-[10%] min-w-full flex justify-center items-center h-20 ">
        <p className="text-white">ICON</p>
      </div>

      <main className="min-h-[90%] flex flex-col gap-2 mt-4 justify-center items-center">
        {channelList.map((channel) => (
          <span key={channel.id} className="">
            {channel.image ? (
              <Image
                src={channel.image}
                alt={channel.name}
                className="w-14 h-14 object-cover rounded-full overflow-hidden"
                width={14}
                height={14}
                unoptimized
              ></Image>
            ) : (
              <div className="w-14 h-14 text-white rounded-full bg-[#363940] overflow-hidden whitespace-nowrap flex items-center justify-center">
                {channel.name}
              </div>
            )}
          </span>
        ))}
        <div className="w-14 h-14 text-white rounded-full bg-[#363940] overflow-hidden whitespace-nowrap flex items-center justify-center">
          <Plus size={24} color="green" />
        </div>
      </main>
    </div>
  );
};

export default SideTab;
