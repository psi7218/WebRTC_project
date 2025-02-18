import { create } from "zustand";
import { Stomp } from "@stomp/stompjs";

interface WebSocketStore {
  stompClient: any;
  isConnected: boolean;
  channelId: number;
  connect: (channelId: number) => void;
  disconnect: () => void;
  updateChannelId: (channelId: number) => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  stompClient: null,
  isConnected: false,
  channelId: -1,
  updateChannelId: (channelId: number) => {
    const { disconnect, connect } = get();
    disconnect();
    connect(channelId);
  },

  connect: (channelId: number) => {
    set((state) => {
      return { ...state, channelId };
    });

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

    if (!wsUrl) {
      console.error("WebSocket URL is not defined!");
      return;
    }

    const client = Stomp.over(() => {
      const ws = new WebSocket(wsUrl);
      return ws;
    });
    client.connect(
      {},
      () => {
        set((state) => {
          return {
            ...state,
            stompClient: client,
            isConnected: true,
          };
        });
      },
      (error) => {
        console.log(error);
        set((state) => ({ ...state, isConnected: false }));
      }
    );
  },
  disconnect: () => {
    const { stompClient } = get();
    if (stompClient?.connected) {
      stompClient.disconnect();
      set({ stompClient: null, isConnected: false, channelId: -1 });
    }
  },
}));
