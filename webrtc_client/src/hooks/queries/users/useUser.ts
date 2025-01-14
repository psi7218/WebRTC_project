// hooks/queries/users/useUser.ts
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/apis/users/userKeys";
import { getUserById } from "@/apis/users/userApi";
import { Users } from "@/apis/users/types";

export const useUser = (userId: number) => {
  return useQuery<Users>({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserById(userId),
    staleTime: 5 * 60 * 1000, // 5분
  });
};
