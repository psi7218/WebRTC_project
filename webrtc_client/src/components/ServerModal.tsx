"use client";

import { createPortal } from "react-dom";

interface ServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ServerModal = ({ isOpen, onClose, children }: ServerModalProps) => {
  if (typeof window === "undefined") return null;
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {/* Modal content */}
      <div className="relative z-50 bg-[#363940] rounded-md p-6 w-[480px] text-white">
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default ServerModal;
