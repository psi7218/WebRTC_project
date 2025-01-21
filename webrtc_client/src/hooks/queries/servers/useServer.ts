import { useQuery } from "@tanstack/react-query";
import { getServerById } from "@/apis/servers/serverApi";
import { serverKeys } from "@/apis/servers/serverKeys";

export const useServer = (serverId: number) => {
  return useQuery({
    queryKey: serverKeys.getServerById(serverId),
    queryFn: () => getServerById(serverId),
    enabled: !!serverId,
  });
};
