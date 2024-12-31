import React from "react";
import { Plus } from "lucide-react";

const PlusGrid = () => {
  return (
    <div className="common-grid">
      <div className="flex flex-col items-center justify-center h-48">
        <Plus className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-white text-lg font-medium">New Meeting</h3>
      </div>
    </div>
  );
};

export default PlusGrid;
