import React from "react";
import { Video } from "lucide-react";

const RecoringsGrid = () => {
  return (
    <div className="other-grid">
      <Video className="w-8 h-8 text-green-500 mb-4" />
      <h3 className="grid-title">Recordings</h3>
      <p className="text-gray-400 mt-2">3 recent recordings</p>
    </div>
  );
};

export default RecoringsGrid;
