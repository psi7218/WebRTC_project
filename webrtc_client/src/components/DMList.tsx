import { useState } from "react";
import CreateDMModal from "./modal/CreateDMModal";

const DMList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="mt-4">
      <div className="px-2 mb-2 flex items-center justify-between">
        <span className="text-[#96989d] text-sm">다이렉트 메시지</span>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-4 h-4 text-[#96989d] hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* DM 채널 목록은 여기에 추가될 예정 */}

      {/* Create DM Modal */}
      <CreateDMModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default DMList;
