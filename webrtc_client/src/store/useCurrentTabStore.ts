import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ServerProps } from "@/types/type";

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
    }
  )
);

export default useCurrentTabStore;
