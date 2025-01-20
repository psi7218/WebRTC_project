import { create } from "zustand";
import { Stomp } from "@stomp/stompjs";

interface WebSocketStore {
  stompClient: any;
  isConnected: boolean;
  channelId: number;
  connect: (channelId: number) => void;
  disconnect: () => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  stompClient: null,
  isConnected: false,
  channelId: -1,
  connect: (channelId: number) => {
    console.log("Connecting to channel:", channelId);

    set((state) => {
      console.log("Setting channelId:", channelId);
      return { ...state, channelId };
    });

    const client = Stomp.over(() => new WebSocket("ws://localhost:8080/ws"));
    client.connect(
      {},
      () => {
        console.log("WebSocket connected, updating store...");
        set((state) => {
          console.log("Updating store with connected state");
          return {
            ...state,
            stompClient: client,
            isConnected: true,
          };
        });
        const currentState = get();
        console.log("Current store state:", currentState);
      },
      (error) => {
        console.error("WebSocket connection error:", error);
        set((state) => ({ ...state, isConnected: false }));
      }
    );
  },
  disconnect: () => {
    console.log("Disconnecting...");
    const { stompClient } = get();
    if (stompClient?.connected) {
      stompClient.disconnect();
      set({ stompClient: null, isConnected: false, channelId: -1 });
      console.log("Disconnected, store reset");
    }
  },
}));
