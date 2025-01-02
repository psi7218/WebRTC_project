import {
  Bell,
  MessageSquare,
  Video,
  Calendar,
  Settings,
  Home,
  Lock,
  Unlock,
} from "lucide-react";

const SideTab = () => {
  return (
    <div className="w-[8%] min-h-screen rounded-tl-3xl rounded-bl-3xl flex flex-col items-center ">
      {/* 로고 영역 */}
      <div className="min-h-[10%] min-w-full flex justify-center items-center h-20 ">
        <Lock className="text-white " />
      </div>

      <div className="flex flex-col items-center min-w-full pt-10">
        <div className="group tab-div">
          <Home className="tab-icon" />
        </div>
        <div className="group tab-div">
          <Bell className="tab-icon" />
        </div>

        <div className="group tab-div">
          <MessageSquare className="tab-icon" />
        </div>

        <div className="group tab-div">
          <Video className="tab-icon" />
        </div>

        <div className="group tab-div">
          <Calendar className="tab-icon" />
        </div>

        <div className="group tab-div">
          <Settings className="tab-icon" />
        </div>
      </div>
    </div>
  );
};

export default SideTab;
