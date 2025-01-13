interface FriendTabHeaderProps {
  selectedCategory: string;
  categories: string[];
  setSelectedCategory: (category: string) => void;
}

const FriendTabHeader = ({
  selectedCategory,
  categories,
  setSelectedCategory,
}: FriendTabHeaderProps) => {
  return (
    <div className="flex h-12 space-x-5 pl-5 items-center">
      {categories.map((category, id) => {
        const isAddFriend = category === "친구 추가하기";
        const isSelected = selectedCategory === category;

        return (
          <div
            key={id}
            onClick={() => setSelectedCategory(category)}
            className={`
              cursor-pointer px-2 py-1 rounded-xl 
              transition-colors duration-200
              ${
                isAddFriend
                  ? isSelected
                    ? "text-[#2DBA67]"
                    : "bg-[#248045] text-white hover:bg-[#1a6334] h-[50%] items-center flex rounded-[5px]"
                  : isSelected
                  ? "bg-gray-700 text-white"
                  : "text-gray-500 hover:bg-gray-600 hover:text-white"
              }
            `}
          >
            {category}
          </div>
        );
      })}
    </div>
  );
};

export default FriendTabHeader;
