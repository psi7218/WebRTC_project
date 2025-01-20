"use client";

import useWebSocket from "@/hooks/custom/useWebSocket";
import { useParams } from "next/navigation";

import { useChannel } from "@/hooks/queries/channels/useChannel";
import { useGetFriends } from "@/hooks/queries/users/useUsers";

import DmHeaders from "@/components/dm/DmHeaders";
import ChattingMainDiv from "@/components/chatting/ChattingMainDiv";

const DirectMessagePage = () => {
  const params = useParams();
  const chattingRoodId = params["chattingRoomId"];

  useWebSocket(Number(chattingRoodId));

  const { data: channelData, isLoading: isLoadingChannel } = useChannel(
    Number(chattingRoodId)
  );

  const participantsQueries = useGetFriends(channelData?.participantIds || []);
  const isLoadingParticipants = participantsQueries.some((q) => q.isLoading);
  const participantsData = participantsQueries
    .map((q) => q.data)
    .filter(Boolean);

  if (isLoadingParticipants) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <DmHeaders participantsData={participantsData} />
      <hr className="border-1 border-black border-opacity-20 w-full" />
      <div className="flex-1 relative">
        <ChattingMainDiv participantsData={participantsData} />
      </div>
    </div>
  );
};

export default DirectMessagePage;
