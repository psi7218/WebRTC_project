import { useQuery } from "@tanstack/react-query";
import { channelKeys } from "@/apis/channel/channelKeys";
import { getChannelById } from "@/apis/channel/channelApi";

export const useChannel = (channelId: number) => {
  return useQuery({
    queryKey: channelKeys.search(channelId),
    queryFn: () => getChannelById(channelId),
    staleTime: 5 * 60 * 1000,
  });
};
