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

  profileImage: string;
  setProfileImage: (profileImage: string) => void;

  friendIds: number[];
  setFriendIds: (friendIds: number[]) => void;
}
export const useUserStore = create<useUserStoreProps>()(
  persist(
    (set) => ({
      userId: -1,
      setUserId: (userId) => set({ userId }),

      username: "",
      setUsername: (username) => set({ username }),

      email: "",
      setEmail: (email) => set({ email }),

      password: "",
      setPassword: (password) => set({ password }),

      profileImage: "",
      setProfileImage: (profileImage) => ({ profileImage }),

      friendIds: [],
      setFriendIds: (friendIds) => set({ friendIds }),
    }),
    {
      name: "userInfo",
      version: 1,
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => key !== "accessToken" && !key.startsWith("set")
          )
        ),
    }
  )
);
