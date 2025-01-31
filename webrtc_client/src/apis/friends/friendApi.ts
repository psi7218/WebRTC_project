import axiosInstance from "../instance/axiosInstance";

export const getAllFriends = async () => {
  try {
    // 현재 로그인한 사용자의 정보를 가져옴
    const response = await axiosInstance.get("users/me");
    const currentUser = response.data;

    // 친구 ID 목록이 있다면 각 친구의 상세 정보를 가져옴
    if (currentUser.friendIds && currentUser.friendIds.length > 0) {
      const friendPromises = currentUser.friendIds.map((friendId: number) =>
        axiosInstance.get(`users/${friendId}`)
      );
      const friendResponses = await Promise.all(friendPromises);
      return friendResponses.map((response) => response.data);
    }

    return [];
  } catch (e) {
    console.error("Error fetching friends:", e);
    throw e;
  }
};
