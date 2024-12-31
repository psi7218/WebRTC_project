import React from "react";
import { Bell } from "lucide-react";

const NotificationsGrid = () => {
  return (
    <div className="other-grid">
      <Bell className="w-8 h-8 text-red-500 mb-4" />
      <h3 className="grid-title">Notifications</h3>
      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full mt-2">
        2
      </span>
    </div>
  );
};

export default NotificationsGrid;
