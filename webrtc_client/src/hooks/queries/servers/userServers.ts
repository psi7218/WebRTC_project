import { useQuery } from "@tanstack/react-query";
import { getAllServers, getServersByUserId } from "@/apis/servers/serverApi";
import { serverKeys } from "@/apis/servers/serverKeys";

export const useServers = (userId: number) => {
  return useQuery({
    queryKey: serverKeys.getServerById(userId),
    queryFn: getAllServers,

    staleTime: 1000 * 60, // 1분
  });
};

export const useUserServers = (userId: number) => {
  return useQuery({
    queryKey: serverKeys.byUserId(userId),
    queryFn: () => getServersByUserId(userId),
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  });
};
