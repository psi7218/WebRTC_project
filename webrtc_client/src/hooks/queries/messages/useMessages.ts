// hooks/queries/messages/useMessages.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { messageKeys } from "@/apis/messages/messageKeys";
import { getChannelMessages, sendMessage } from "@/apis/messages/messageApi";

export const useMessages = (channelId: number) => {
  const queryClient = useQueryClient();

  // 메시지 조회 쿼리
  const { data: messages, isLoading } = useQuery({
    queryKey: messageKeys.getByChannelId(channelId),
    queryFn: () => getChannelMessages(channelId),
    enabled: !!channelId && channelId !== -1,
  });

  // 메시지 전송 뮤테이션
  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      // 메시지 전송 성공 시 메시지 목록 재조회
      queryClient.invalidateQueries({
        queryKey: messageKeys.getByChannelId(channelId),
      });
    },
  });

  // WebSocket으로 새 메시지 수신 시 캐시 업데이트
  const updateMessagesCache = (newMessage: any) => {
    queryClient.setQueryData(
      messageKeys.getByChannelId(channelId),
      (oldMessages: any[] = []) => {
        return [...oldMessages, newMessage];
      }
    );
  };

  return {
    messages,
    isLoading,
    sendMessageMutation,
    updateMessagesCache,
  };
};
