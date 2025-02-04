import { create } from "zustand";
import { OpenVidu } from "openvidu-browser";
import { persist } from "zustand/middleware";

interface VoiceChannelState {
  channelId: string | null;
  session: any | null;
  publisher: any | null;
  subscribers: any[];
  mainStreamManager: any | null;
  OV: OpenVidu | null;
  isConnected: boolean;

  setVoiceChannel: (channelId: string) => void;
  setSession: (session: any) => void;
  setPublisher: (publisher: any) => void;
  setSubscribers: (
    subscribersOrUpdater: any[] | ((prev: any[]) => any[])
  ) => void;
  setMainStreamManager: (streamManager: any) => void;
  setOV: (OV: OpenVidu) => void;
  setIsConnected: (isConnected: boolean) => void;
  disconnect: () => Promise<void>;
  reset: () => void;
}

export const useCurrentVoiceChannel = create<VoiceChannelState>()(
  persist(
    (set, get) => ({
      channelId: null,
      session: null,
      publisher: null,
      subscribers: [],
      mainStreamManager: null,
      OV: null,
      isConnected: false,

      setVoiceChannel: (channelId) => set({ channelId }),
      setSession: (session) => set({ session }),
      setPublisher: (publisher) =>
        set({ publisher, mainStreamManager: publisher }),
      setSubscribers: (subscribersOrUpdater) =>
        set((state) => ({
          subscribers:
            typeof subscribersOrUpdater === "function"
              ? subscribersOrUpdater(state.subscribers)
              : subscribersOrUpdater,
        })),
      setMainStreamManager: (streamManager) =>
        set({ mainStreamManager: streamManager }),
      setOV: (OV) => set({ OV }),
      setIsConnected: (isConnected) => set({ isConnected }),

      disconnect: async () => {
        const { session, publisher, subscribers } = get();

        if (session) {
          try {
            // Unpublish our stream
            if (publisher) {
              await session.unpublish(publisher);
              publisher.destroy();
            }

            // Unsubscribe from all streams
            subscribers.forEach((subscriber) => {
              session.unsubscribe(subscriber);
            });

            // Disconnect from session
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
          subscribers: [],
          mainStreamManager: null,
          OV: null,
          isConnected: false,
        }),
    }),
    {
      name: "current-voice-channel",
      partialize: (state) => ({
        channelId: state.channelId,
      }),
    }
  )
);
