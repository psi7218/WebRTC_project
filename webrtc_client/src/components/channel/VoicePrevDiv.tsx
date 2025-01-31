interface VoicePrevDivProps {
  onConnect: () => void;
}

const VoicePrevDiv = ({ onConnect }: VoicePrevDivProps) => {
  return (
    <div className="h-full w-full flex flex-col bg-[#000000] justify-center items-center">
      <p className="text-white text-2xl font-bold">일반</p>
      <p className="text-white text-lg">현재 채널에 아무도 없어요.</p>
      <button
        className="bg-[#248045] text-white px-4 py-2 rounded-3xl"
        onClick={onConnect}
      >
        음성 채널 참여하기
      </button>
    </div>
  );
};

export default VoicePrevDiv;
