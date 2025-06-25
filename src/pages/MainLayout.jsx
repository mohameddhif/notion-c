import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const routeTitle = {
    '/dashboard': 'Tableau de Bord',
    '/calendrier': 'Calendrier',
    '/projets': 'Projets'
  };

  const location = useLocation();
  const activeItem = routeTitle[location.pathname] || 'Tableau de Bord';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        toggleCollapse={toggleCollapse}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeItem={activeItem} toggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
