import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}
const Modal = ({ isOpen, children }: ModalProps) => {
  if (typeof window === "undefined") return null;
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(<div>{children}</div>, modalRoot);
};

export default Modal;
