// hooks/mutations/servers/useInviteUserToServer.ts
import { useMutation } from "@tanstack/react-query";
import { inviteUserToServer } from "@/apis/servers/serverApi";

interface InviteUserParams {
  userId: number;
  serverId: number;
  onStatusChange: (
    userId: number,
    status: "pending" | "completed" | "idle"
  ) => void;
}

export const useInviteUserToServer = () => {
  return useMutation({
    mutationFn: async ({ userId, serverId }: InviteUserParams) => {
      const response = await inviteUserToServer(userId, serverId);
      return { userId, response }; // userId를 response와 함께 반환
    },
    onMutate: (variables) => {
      // 요청 시작 시 pending 상태로 변경
      variables.onStatusChange(variables.userId, "pending");
    },
    onSuccess: (data, variables) => {
      // 성공 시 completed 상태로 변경
      variables.onStatusChange(variables.userId, "completed");
    },
    onError: (_error, variables) => {
      // 실패 시 idle 상태로 변경
      variables.onStatusChange(variables.userId, "idle");
    },
  });
};
