import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSend?.(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <textarea
        className="flex-1 p-2 rounded-md bg-gray-700 text-white focus:outline-none resize-none"
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 px-4 py-2 rounded-md text-white"
      >
        전송
      </button>
    </div>
  );
};

export default ChatInput;
