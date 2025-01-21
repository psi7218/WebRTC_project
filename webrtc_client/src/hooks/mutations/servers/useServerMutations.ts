import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServer, deleteServer } from "@/apis/servers/serverApi";
import { serverKeys } from "@/apis/servers/serverKeys";

export const useCreateServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createServer,
    onSuccess: (newServer) => {
      // 서버 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: serverKeys.list(),
      });

      // 새로운 서버를 캐시에 즉시 추가
      queryClient.setQueryData(serverKeys.list(), (old: any) => {
        return old ? [...old, newServer] : [newServer];
      });
    },
  });
};

export const useDeleteServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteServer,
    onSuccess: (_, deletedServerId) => {
      // 서버 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: serverKeys.list(),
      });

      // 삭제된 서버를 캐시에서 즉시 제거
      queryClient.setQueryData(serverKeys.list(), (old: any) => {
        return old
          ? old.filter((server: any) => server.id !== deletedServerId)
          : [];
      });
    },
  });
};
