import { useQuery } from "@tanstack/react-query";
import { channelKeys } from "@/apis/channel/channelKeys";
import { getChannelById } from "@/apis/channel/channelApi";

export const useChannelById = (channelId: number) => {
  return useQuery({
    queryKey: channelKeys.search(channelId),
    queryFn: () => getChannelById(channelId),
    staleTime: 5 * 60 * 1000,
    enabled: !!channelId,
  });
};

// export const useConnectingVoiceChannel = (channelId: number) => {};
