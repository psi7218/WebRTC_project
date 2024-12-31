import React from "react";
import PlusGrid from "@/components/PlusGrid";
import QuickJoinGrid from "@/components/QuickJoinGrid";
import ScheduleGrid from "@/components/ScheduleGrid";
import SettingGrid from "@/components/SettingGrid";
import NotificationsGrid from "@/components/NotificationsGrid";
import RecoringsGrid from "@/components/RecordingsGrid";

const Home = () => {
  return (
    <div className="min-h-screen bg-foreground">
      {/* Top Navigation */}
      <nav className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xl text-white font-semibold">MEET.IO</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white">Charlie</span>
          <div className="w-8 h-8 rounded-full bg-gray-600"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-3 gap-10 grid-rows-2">
          <PlusGrid />
          <QuickJoinGrid />
          <ScheduleGrid />

          <SettingGrid />
          <NotificationsGrid />
          <RecoringsGrid />
        </div>
      </main>
    </div>
  );
};

export default Home;
