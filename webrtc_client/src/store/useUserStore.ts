import { persist } from "zustand/middleware";
import { create } from "zustand";

interface useUserStoreProps {
  userId: number;
  setUserId: (userId: number) => void;

  username: string;
  setUsername: (username: string) => void;

  email: string;
  setEmail: (email: string) => void;

  password: string;
  setPassword: (pasword: string) => void;

  thumbnailColor: string;
  setThumbnailColor: (thumbnailColor: string) => void;

  friendIds: number[];
  setFriendIds: (friendIds: number[]) => void;

  participatingChannelIds: number[];
  setParticipatingChannelIds: (participatingChannelIds: number[]) => void;

  logout: () => void;
  resetPersistStorage?: () => void;
}
export const useUserStore = create<useUserStoreProps>()(
  persist(
    (set, get) => ({
      userId: -1,
      setUserId: (userId) => set({ userId }),

      username: "",
      setUsername: (username) => set({ username }),

      email: "",
      setEmail: (email) => set({ email }),

      password: "",
      setPassword: (password) => set({ password }),

      thumbnailColor: "",
      setThumbnailColor: (thumbnailColor) => set({ thumbnailColor }),

      participatingChannelIds: [],
      setParticipatingChannelIds: (participatingChannelIds) =>
        set({ participatingChannelIds }),

      friendIds: [],
      setFriendIds: (friendIds) => set({ friendIds }),

      logout: () => {
        // 1) Zustand state 초기화
        set({
          userId: -1,
          username: "",
          email: "",
          password: "",
          thumbnailColor: "",
          friendIds: [],
          participatingChannelIds: [],
        });
        // 2) persist 스토리지 제거
        // zustand 버전에 따라 이름이 조금 다를 수 있음
        get().resetPersistStorage?.();
        // or useUserStore.persist.clearStorage();
      },
    }),
    {
      name: "userInfo",
      version: 1,
      partialize: (state) => ({
        ...state,
        resetPersistStorage: undefined, // 함수는 제외
        logout: undefined, // 함수는 제외
      }),
    }
  )
);
