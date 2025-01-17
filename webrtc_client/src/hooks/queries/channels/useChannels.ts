import { useQueries, useQuery } from "@tanstack/react-query";
import { channelKeys } from "@/apis/channel/channelKeys";
import {
  getAllChannels,
  getChannelsByServer,
  getChannelById,
} from "@/apis/channel/channelApi";

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
