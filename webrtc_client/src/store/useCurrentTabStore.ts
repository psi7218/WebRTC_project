import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ServerProps } from "@/types/type";

/// 추후에 바꾸자. tab 기준이 아니라 참여하고 있는 음성 채널을 저장하는 서버로 해야됨

interface useCurrentTabStoreState {
  currentServer: ServerProps | null;
  setCurrentServer: (currentServerId: ServerProps | null) => void;
}

// 새로고침 시 클리어 넣어야됨 아니면 persist에 넣지말던가
const useCurrentTabStore = create<useCurrentTabStoreState>()(
  persist(
    (set) => ({
      currentServer: null,
      setCurrentServer: (currentServer) => set({ currentServer }),
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
