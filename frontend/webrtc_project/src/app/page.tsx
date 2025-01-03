import React from "react";

import SideTab from "@/components/SideTab";
import SubContainer from "@/components/SubContainer";

const Home = () => {
  return (
    <div className="flex">
      {/* sideTab - channel */}
      <main className="w-[6%] min-h-screen">
        <SideTab />
      </main>

      <div className="bg-[#303136] w-[94%] min-h-screen rounded-tl-2xl flex">
        <div className="w-[20%] min-h-screen">
          <SubContainer />
        </div>
        <div className="bg-[#363940] w-[80%] min-h-screen">
          <p>big container</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
