import { useMutation } from "@tanstack/react-query";
import { connectingVoiceChannel } from "@/apis/channel/channelApi";

export const useConnectingVoiceChannel = () => {
  return useMutation({
    mutationFn: (channelId: number) => connectingVoiceChannel(channelId),
    // onSuccess, onError 등을 여기서 설정할 수도 있음
  });
};
