import React from "react";
import { Outlet } from "react-router-dom";
import { SideBer } from "./Sideber";
import Navber from "./Navber";
const Rootleayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="bg-gray-800">
        <SideBer />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="bg-white shadow">
          <Navber />
        </header>

        <main className="flex-1 overflow-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Rootleayout;
