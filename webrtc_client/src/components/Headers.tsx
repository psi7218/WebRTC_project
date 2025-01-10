"use client";

import AuthenticateModal from "./modal/AuthenticateModal";
import { useState } from "react";
import { login } from "@/apis/authApi";
import { useUserStore } from "@/store/useUserStore";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    userId,
    username,
    setUserId,
    setEmail,
    setFriendIds,
    setPassword,
    setProfileImage,
    setUsername,
  } = useUserStore();
  const email = "test@gmail";
  const password = "1234";

  const handlelogin = async () => {
    const response = await login({
      email,
      password,
    });

    setUserId(response["userId"]);
    setEmail(response["email"]);
    setFriendIds(response["friendIds"]);
    setPassword(response["password"]);
    setProfileImage(response["profileImage"]);
    setUsername(response["username"]);
    setIsModalOpen(false);
  };
  return (
    <header className="h-[5%] bg-[#202225] flex items-center justify-between px-4 text-white">
      <h1 className="text-lg font-bold">Discord Clone</h1>
      <div>
        {userId ? (
          <div>{username}</div>
        ) : (
          <button
            className="px-4 py-2 rounded mr-2"
            onClick={() => setIsModalOpen(true)}
          >
            LOGIN
          </button>
        )}
      </div>
      <AuthenticateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Email" className="p-2 rounded" />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded"
          />
          <div className="flex items-center">
            <button>SIGNUP</button>
            <button className="px-4 py-2 rounded" onClick={handlelogin}>
              LOGIN
            </button>
          </div>
        </div>
      </AuthenticateModal>
    </header>
  );
};

export default Header;
