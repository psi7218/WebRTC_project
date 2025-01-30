import CurrentVoiceChannel from "../common/CurrentVoiceChannel";

const SubContainer = () => {
  return (
    <div className="w-60 bg-[#2b2d31] flex flex-col">
      {/* ... existing code ... */}

      {/* 현재 음성 채널 상태 표시 */}
      <div className="mt-auto">
        <CurrentVoiceChannel />
      </div>

      {/* ... existing code ... */}
    </div>
  );
};

// ... rest of the code ...
