import React from "react";
import { MessageSquare } from "lucide-react";

const QuickJoinGrid = () => {
  return (
    <div className="other-grid">
      <MessageSquare className="w-8 h-8 text-blue-500 mb-4" />
      <h3 className="grid-title">Quick Join</h3>
      <div className="flex mt-4 space-x-2">
        <div className="w-8 h-8 rounded-full bg-blue-500"></div>
        <div className="w-8 h-8 rounded-full bg-green-500"></div>
        <div className="w-8 h-8 rounded-full bg-purple-500"></div>
        <span className="text-gray-400 text-sm">+3 more</span>
      </div>
      <div className="mt-4 w-full bg-gray-700 h-1 rounded-full">
        <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default QuickJoinGrid;
