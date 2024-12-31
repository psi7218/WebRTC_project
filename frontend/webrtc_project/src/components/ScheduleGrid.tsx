import React from "react";
import { Calendar } from "lucide-react";

const ScheduleGrid = () => {
  return (
    <div className="other-grid">
      <Calendar className="w-8 h-8 text-purple-500 mb-4" />
      <h3 className="grid-title">Schedule</h3>
      <p className="text-gray-400 mt-2">No upcoming meetings</p>
    </div>
  );
};

export default ScheduleGrid;
