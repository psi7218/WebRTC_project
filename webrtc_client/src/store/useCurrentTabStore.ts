import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ServerProps } from "@/types/type";

/// 추후에 바꾸자. tab 기준이 아니라 참여하고 있는 음성 채널을 저장하는 서버로 해야됨
// 01.22 현재 참여하고 있는 음성 채널 탭 및 서버와 현재 보고 있는 탭을 분리해야될듯

interface useCurrentTabStoreState {
  currentServer: ServerProps | null;
  currentViewingTab: number | null;
  setCurrentServer: (currentServerId: ServerProps | null) => void;
  setCurrentViewingTab: (currentViewingTab: number | null) => void;
}

// 새로고침 시 클리어 넣어야됨 아니면 persist에 넣지말던가
const useCurrentTabStore = create<useCurrentTabStoreState>()(
  persist(
    (set) => ({
      currentServer: null,
      setCurrentServer: (currentServer) => set({ currentServer }),
      currentViewingTab: null,
      setCurrentViewingTab: (currentViewingTab: number | null) =>
        set({ currentViewingTab }),
    }),
    {
      name: "currentTab",
      version: 1, // 버전이 무얼 의미하는지? todo:
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => key !== "accessToken" && !key.startsWith("set")
          )
        ),
    }
  )
);

export default useCurrentTabStore;
