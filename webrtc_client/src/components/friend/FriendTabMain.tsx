// import { useState } from "react";

import FriendFilteredTab from "./FriendFilteredTab";
import FriendActiveStateTab from "./FriendActiveStateTab";
import FriendAddingTab from "./FriendAddingTab";

interface FriendTabMainProps {
  selectedCategory: string;
  isAddingFriendButtonClicked: boolean;
}

const FrienTabMain = ({
  selectedCategory,
  isAddingFriendButtonClicked,
}: FriendTabMainProps) => {
  return (
    <div className="flex h-[91%]">
      {isAddingFriendButtonClicked ? (
        <FriendAddingTab />
      ) : (
        <FriendFilteredTab selectedCategory={selectedCategory} />
      )}

      <FriendActiveStateTab />
    </div>
  );
};

export default FrienTabMain;
