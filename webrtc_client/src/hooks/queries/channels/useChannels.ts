import { useQueries, useQuery } from "@tanstack/react-query";
import { channelKeys } from "@/apis/channel/channelKeys";
import { getChannelsByServer, getChannelById } from "@/apis/channel/channelApi";

export const useChannels = (channelIds: number[]) => {
  const results = useQueries({
    queries: channelIds.map((channelId) => {
      return {
        queryKey: channelKeys.search(channelId),
        queryFn: () => getChannelById(channelId),
        enabled: !!channelId,
        staletime: 5 * 60 * 1000,
      };
    }),
  });
  return results;
};

export const useChannelsByServerId = (serverId: number) => {
  return useQuery({
    queryKey: channelKeys.getChannelsById(serverId),
    queryFn: () => getChannelsByServer(serverId),
    enabled: !!serverId,
    staleTime: 5 * 60 * 1000,
  });
};
