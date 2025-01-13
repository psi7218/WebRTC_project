// 처음 랜더링되는 디폴트화면
"use client";
import { useState } from "react";
import React from "react";
import FriendTabHeader from "@/components/friend/FriendTabHeader";
import FrienTabMain from "@/components/friend/FriendTabMain";

const ChannelPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("온라인");
  const categories = ["온라인", "모두", "대기중", "친구 추가하기"];
  const [isAddingFriendButtonClicked, setIsAddingFriendButtonClicked] =
    useState<boolean>(false);

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
