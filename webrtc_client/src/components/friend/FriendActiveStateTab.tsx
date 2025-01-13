const FriendActiveStateTab = () => {
  return (
    <div className="w-[40%] h-full">
      <p className="text-white font-semibold pt-2 px-5 text-xl">현재 활동중</p>
      <div className="flex flex-col items-center justify-center h-[20%] text-gray-400">
        <p className="text-lg">지금은 조용하네요...</p>
        <p className="text-sm mt-2 text-center px-4">
          친구가 게임이나 음성 채팅과 같은 활동을 시작하면 여기에 표시돼요!
        </p>
      </div>
    </div>
  );
};
export default FriendActiveStateTab;
