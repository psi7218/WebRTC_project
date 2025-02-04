import { useMutation } from "@tanstack/react-query";
import { createConnection } from "@/apis/channel/channelApi";

export const useConnectingVoiceChannel = () => {
  return useMutation({
    mutationFn: async (channelId: number) => {
      // 2. 연결 토큰 생성
      const token = await createConnection(channelId);
      return token;
    },
  });
};
