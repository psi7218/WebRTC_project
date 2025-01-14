// components/modal/SignUpModal.tsx
"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { checkDuplicate, signUp } from "@/apis/auth/authApi";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROFILE_COLORS = [
  "#5865F2", // Discord Blue
  "#57F287", // Green
  "#FEE75C", // Yellow
  "#EB459E", // Fuchsia
  "#ED4245", // Red
  "#000000", // Black
];

const SignUpModal = ({ isOpen, onClose }: SignUpModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [selectedColor, setSelectedColor] = useState("#5865F2");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    const isEmailAvailable = await checkDuplicate(email);
    if (!isEmailAvailable["available"]) {
      setError("이미 사용 중인 이메일입니다.");
      return;
    }

    await signUp({
      email,
      password,
      username,
      profileColor: selectedColor,
    });

    onClose();
  };

  if (typeof window === "undefined") return null;
  if (!isOpen) return null;

  const modalRoot = document.getElementById("SignUp-root");
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-50 bg-[#363940] rounded-md p-6 w-[480px] text-white">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">회원가입</h2>

          <div className="flex flex-col items-center mb-4">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: selectedColor }}
            >
              <Image
                src="/assets/discord-mark-white.png"
                alt="Discord Logo"
                width={48}
                height={48}
              />
            </div>
            <div className="flex gap-2 mt-2">
              {PROFILE_COLORS.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-white"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="이메일"
            className="p-2 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="비밀번호"
            className="p-2 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="닉네임"
            className="p-2 rounded text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleSignUp}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default SignUpModal;
