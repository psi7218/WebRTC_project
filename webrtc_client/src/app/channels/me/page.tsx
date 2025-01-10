// 처음 랜더링되는 디폴트화면
"use client";
import { useState } from "react";
import React from "react";
import FriendTabHeader from "@/components/friend/FriendTabHeader";
import FrienTabMain from "@/components/friend/FriendTabMain";

const ChannelPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("온라인");
  const categories = ["온라인", "모두", "대기중"];
  return (
    <>
      <FriendTabHeader
        selectedCategory={selectedCategory}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
      />

      <hr className="border-1 border-black border-opacity-20 w-full" />
      <FrienTabMain selectedCategory={selectedCategory} />
    </>
  );
};

export default ChannelPage;
