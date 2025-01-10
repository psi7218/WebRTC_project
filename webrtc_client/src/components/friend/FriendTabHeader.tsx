interface FriendTabHeaderProps {
  selectedCategory: string;
  categories: string[];
  setSelectedCategory: () => void;
}

const FriendTabHeader = ({
  selectedCategory,
  categories,
  setSelectedCategory,
}: FriendTabHeaderProps) => {
  return (
    <div className="h-12 flex space-x-5 pl-5 items-center">
      {categories.map((category, id) => (
        <div
          key={id}
          onClick={() => setSelectedCategory(category)}
          className={`
        cursor-pointer px-2 py-1 rounded-xl 
        transition-colors duration-200

        text-gray-500 
        hover:bg-gray-600 hover:text-white 
        ${selectedCategory === category ? "bg-gray-700 text-white" : ""}
      `}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default FriendTabHeader;
