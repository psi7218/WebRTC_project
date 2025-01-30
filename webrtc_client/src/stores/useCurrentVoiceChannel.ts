import { create } from "zustand";
import { OpenVidu } from "openvidu-browser";

interface VoiceChannelState {
  channelId: string | null;
  session: any | null;
  publisher: any | null;
  OV: OpenVidu | null;
  isConnected: boolean;
  setVoiceChannel: (channelId: string) => void;
  setSession: (session: any) => void;
  setPublisher: (publisher: any) => void;
  setOV: (OV: OpenVidu) => void;
  setIsConnected: (isConnected: boolean) => void;
  disconnect: () => Promise<void>;
  reset: () => void;
}

export const useCurrentVoiceChannel = create<VoiceChannelState>((set, get) => ({
  channelId: null,
  session: null,
  publisher: null,
  OV: null,
  isConnected: false,

  setVoiceChannel: (channelId) => set({ channelId }),
  setSession: (session) => set({ session }),
  setPublisher: (publisher) => set({ publisher }),
  setOV: (OV) => set({ OV }),
  setIsConnected: (isConnected) => set({ isConnected }),

  disconnect: async () => {
    const { session, publisher } = get();
    if (session && publisher) {
      try {
        await session.unpublish(publisher);
        publisher.destroy();
        await session.disconnect();
      } catch (error) {
        console.error("Error disconnecting:", error);
      }
    }
    get().reset();
  },

  reset: () =>
    set({
      channelId: null,
      session: null,
      publisher: null,
      isConnected: false,
    }),
}));
