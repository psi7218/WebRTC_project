import React from "react";
import { Settings } from "lucide-react";

const SettingGrid = () => {
  return (
    <div className="other-grid">
      <Settings className="w-8 h-8 text-yellow-500 mb-4" />
      <h3 className="grid-title">Settings</h3>
    </div>
  );
};

export default SettingGrid;
