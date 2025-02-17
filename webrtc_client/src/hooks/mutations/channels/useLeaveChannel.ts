// mutations/channels/useLeaveChannel.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { removeUserFromDMChannel } from "@/apis/channel/channelApi";
import { channelKeys } from "@/apis/channel/channelKeys";

interface LeaveChannelParams {
  channelId: number;
  userId: number;
}

export const useLeaveChannel = (currentChannelId?: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { participatingChannelIds, setParticipatingChannelIds } =
    useUserStore();

  return useMutation({
    mutationFn: ({ channelId, userId }: LeaveChannelParams) =>
      removeUserFromDMChannel(channelId, userId),
    onSuccess: (data, variables) => {
      // 로컬 상태 업데이트
      setParticipatingChannelIds(
        participatingChannelIds.filter((id) => id !== variables.channelId)
      );

      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: channelKeys.all });

      // 현재 채널에서 나갔다면 친구 탭으로 이동
      if (
        currentChannelId &&
        Number(currentChannelId) === variables.channelId
      ) {
        router.push("/channels/me");
      }
    },
  });
};
