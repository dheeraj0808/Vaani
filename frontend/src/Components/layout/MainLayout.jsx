import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[280px] min-h-screen max-w-2xl border-r border-gray-800">
          <Outlet />
        </main>
        {/* Right sidebar area - keeps content centered */}
        <div className="hidden xl:block flex-1" />
      </div>
    </div>
  );
};

export default MainLayout;