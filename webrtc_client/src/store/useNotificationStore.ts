// store/useNotificationStore.ts
import { create } from "zustand";

interface Notification {
  type: "SERVER_INVITE" | "SERVER_INVITE_ACCEPTED";
  serverId: number;
  serverName: string;
  timestamp: number;
}

interface NotificationStore {
  notifications: Notification[];
  eventSource: EventSource | null;
  connect: (userId: number) => void;
  disconnect: () => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (timestamp: number) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  eventSource: null,

  connect: (userId: number) => {
    const { disconnect } = get();
    disconnect(); // 기존 연결이 있다면 끊기

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const eventSource = new EventSource(
      `${baseUrl}/servers/subscribe/${userId}`
    );

    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      set((state) => ({
        notifications: [
          ...state.notifications,
          {
            ...notification,
            timestamp: Date.now(),
          },
        ],
      }));
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      disconnect();
    };

    set({ eventSource });
  },

  disconnect: () => {
    const { eventSource } = get();
    if (eventSource) {
      eventSource.close();
      set({ eventSource: null });
    }
  },

  addNotification: (notification: Notification) => {
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
  },

  removeNotification: (timestamp: number) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (n) => n.timestamp !== timestamp
      ),
    }));
  },
}));
