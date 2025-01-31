import { useState } from "react";

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
}

const VoiceConnectingDiv = () => {
  // 임시로 참가자 목록을 하드코딩 (실제로는 OpenVidu 세션에서 받아와야 함)
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "나", isMuted: false },
    { id: "2", name: "참가자2", isMuted: true },
    { id: "3", name: "참가자3", isMuted: false },
    { id: "4", name: "참가자4", isMuted: true },
  ]);

  // 그리드 레이아웃 클래스를 동적으로 결정
  const getGridClass = () => {
    return "grid grid-cols-2 gap-4";
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#000000]">
      <div className="flex-1 overflow-hidden">
        {/* Voice Channel Content */}
        <div className="p-3 h-[calc(100%-48px)]">
          {/* Participants Grid */}
          <div className={`${getGridClass()} h-full`}>
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="relative bg-[#202225] rounded-lg aspect-video"
              >
                {/* Screen Share Container (비디오/화면 공유 영역) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    id={`video-container-${participant.id}`}
                    className="w-full h-full"
                  ></div>
                </div>

                {/* Participant Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {/* User Avatar */}
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-[#202225]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {participant.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hidden Video Container */}
          <div className="hidden">
            <div
              id="publisher-container"
              className="bg-gray-800 rounded-sm aspect-video flex items-center justify-center"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceConnectingDiv;
