import React from 'react';
import Navbar from '../components/owner/Navbar';
import Sidebar from '../components/owner/Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[120px] md:w-[280px] bg-[#F1F5F9]">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
