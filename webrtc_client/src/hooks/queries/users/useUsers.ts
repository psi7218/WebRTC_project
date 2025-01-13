import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/apis/users/userKeys";
import { getAllUsers, searchUsers } from "@/apis/users/userApi";

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useSearchUsers = (keyword: string) => {
  return useQuery({
    queryKey: userKeys.search(keyword),
    queryFn: () => searchUsers(keyword),
    enabled: keyword.length >= 2, // 2글자 이상일 때만 검색
    staleTime: 0, // 검색은 항상 최신 데이터 필요
  });
};
