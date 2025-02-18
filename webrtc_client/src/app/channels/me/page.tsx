// 처음 랜더링되는 디폴트화면
"use client";
import { useState, useEffect } from "react";
import React from "react";
import FriendTabHeader from "@/components/friend/FriendTabHeader";
import FrienTabMain from "@/components/friend/FriendTabMain";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useUserStore } from "@/store/useUserStore";

const ChannelPage = () => {
  const userId = useUserStore((state) => state.userId);
  const { connect, disconnect, notification } = useNotificationStore();

  const [selectedCategory, setSelectedCategory] = useState<string>("온라인");
  const categories = ["온라인", "모두", "대기중", "친구 추가하기"];
  const [isAddingFriendButtonClicked, setIsAddingFriendButtonClicked] =
    useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      connect(userId);
    }
    return () => disconnect();
  }, [userId]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "친구 추가하기") {
      setIsAddingFriendButtonClicked(true);
    } else {
      setIsAddingFriendButtonClicked(false);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <FriendTabHeader
          selectedCategory={selectedCategory}
          categories={categories}
          setSelectedCategory={handleCategoryChange}
        />
      </div>

      <hr className="border-1 border-black border-opacity-20 w-full" />
      <FrienTabMain
        selectedCategory={selectedCategory}
        isAddingFriendButtonClicked={isAddingFriendButtonClicked}
      />
    </>
  );
};

export default ChannelPage;
