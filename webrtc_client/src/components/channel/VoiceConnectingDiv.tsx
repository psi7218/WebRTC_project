import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useCurrentVoiceChannel } from "@/stores/useCurrentVoiceChannel";

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  streamManager?: any; // OpenVidu StreamManager (Publisher 또는 Subscriber)
}

const VoiceConnectingDiv = () => {
  const currentUserId = useUserStore((state) => state.userId);
  const currentUsername = useUserStore((state) => state.username);
  const { publisher, subscribers } = useCurrentVoiceChannel();

  // 참가자 목록 상태
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showVideoSettings, setShowVideoSettings] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // 참가자 목록 업데이트 (본인 + 다른 참가자들)
  useEffect(() => {
    const allParticipants: Participant[] = [];

    // 자신을 참가자 목록에 추가
    if (publisher) {
      allParticipants.push({
        id: String(currentUserId),
        name: currentUsername,
        isMuted: !publisher.stream.audioActive,
        streamManager: publisher,
      });
    }

    // 다른 참가자들 추가
    subscribers.forEach((subscriber) => {
      // connection.data에서 참가자 정보 파싱
      const connectionData = JSON.parse(subscriber.stream.connection.data);
      allParticipants.push({
        id: subscriber.stream.connection.connectionId,
        name: connectionData.clientData,
        isMuted: !subscriber.stream.audioActive,
        streamManager: subscriber,
      });
    });

    setParticipants(allParticipants);
  }, [publisher, subscribers, currentUserId, currentUsername]);

  // 비디오 활성화/비활성화 처리
  const handleShowVideo = async () => {
    if (publisher) {
      try {
        await publisher.publishVideo(true);
        setShowVideo(true);
      } catch (error) {
        console.error("Error publishing video:", error);
      }
    }
  };

  // OpenVidu 비디오 요소를 렌더링하는 컴포넌트
  const VideoStreamView = ({ streamManager }: { streamManager: any }) => {
    useEffect(() => {
      if (streamManager) {
        const videoElement = document.createElement("video");
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.objectFit = "cover";
        streamManager.addVideoElement(videoElement);

        const container = document.getElementById(
          `video-container-${streamManager.stream.connection.connectionId}`
        );
        if (container) {
          // 기존 비디오 요소 제거
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          container.appendChild(videoElement);
        }

        return () => {
          if (videoElement.parentNode) {
            videoElement.parentNode.removeChild(videoElement);
          }
        };
      }
    }, [streamManager]);

    return null;
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#000000]">
      <div className="flex-1 overflow-hidden">
        <div className="p-3 h-[calc(100%-48px)]">
          <div className="grid grid-cols-2 gap-4 h-full">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="relative bg-[#202225] rounded-lg aspect-video group"
                onMouseEnter={() => {
                  if (participant.id === String(currentUserId)) {
                    setShowVideoSettings(true);
                  }
                }}
                onMouseLeave={() => {
                  if (participant.id === String(currentUserId)) {
                    setShowVideoSettings(false);
                  }
                }}
              >
                {/* 비디오 컨테이너 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    id={`video-container-${participant.id}`}
                    className="w-full h-full"
                  >
                    {participant.streamManager && (
                      <VideoStreamView
                        streamManager={participant.streamManager}
                      />
                    )}
                  </div>
                </div>

                {/* 비디오 설정 버튼 */}
                {participant.id === String(currentUserId) &&
                  showVideoSettings &&
                  !participant.streamManager?.stream?.videoActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity">
                      <button
                        onClick={handleShowVideo}
                        className="px-4 py-2 bg-[#5865f2] text-white rounded hover:bg-[#4752c4]"
                      >
                        화상 연결
                      </button>
                    </div>
                  )}

                {/* 참가자 정보 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#202225]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
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
        </div>
      </div>
    </div>
  );
};

export default VoiceConnectingDiv;
