import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div
        className="ml-0 md:ml-[260px]"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main
          className="p-4 sm:p-6 md:p-[30px] overflow-x-hidden"
          style={{
            flex: 1,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}