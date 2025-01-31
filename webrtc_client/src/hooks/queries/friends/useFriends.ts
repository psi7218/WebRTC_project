import { useQuery } from "@tanstack/react-query";
import { getAllFriends } from "@/apis/friends/friendApi";
import { friendKeys } from "@/apis/friends/friendKeys";

interface Friend {
  id: number;
  username: string;
  email: string;
  status: string;
  friendIds: number[];
  createdAt: string;
  updatedAt: string;
}

export const useFriends = () => {
  return useQuery<Friend[]>({
    queryKey: friendKeys.all,
    queryFn: getAllFriends,
  });
};
