const FriendAddingTab = () => {
  return (
    <div className="w-[60%] h-full border-r border-1 border-gray-600 px-8 pt-4">
      <p className="text-white text-lg font-bold pb-1">친구 추가하는 탭</p>
      <p className="text-gray-500 pb-3">
        Discord 사용자명을 사용하여 친구를 추가할 수 있어요.
      </p>
      <div className="relative">
        <input
          type="text"
          placeholder="Discord 사용자명을 사용하여 친구를 추가할 수 있어요."
          className="pl-5 pr-24 w-full bg-[#1E1F22] h-12 rounded-xl text-white"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#5865F2] text-white px-4 py-1 rounded-lg hover:bg-[#4752C4]">
          친구 요청보내기
        </button>
      </div>
    </div>
  );
};

export default FriendAddingTab;
