import React, { useState } from 'react';
import { ChevronLeft, Menu, Search } from 'lucide-react';
import user from '../assets/profile-pictures/user1.jpg';
import { menuItems } from '../constants/index';
import ProjectsList from '../components/ProjectsList';
import { sampleProjects } from '../constants/index';

function CalendarComponent() {
  return (
    <iframe
      src="https://calendar.google.com/calendar/embed?src=dhifmohamed4%40gmail.com&ctz=Africa%2FTunis"
      className="w-full h-[600px] border-0"
    ></iframe>
  );
}

const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Desktop collapse
  const [activeItem, setActiveItem] = useState('Tableau de Bord');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r shadow-lg transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:flex md:flex-col
        ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b">
          {!isSidebarCollapsed && <h1 className="text-xl font-bold">Notion</h1>}
          <button
            onClick={isSidebarOpen ? toggleSidebar : toggleCollapse}
            className="p-1 rounded-full hover:bg-gray-200 md:block"
          >
            <ChevronLeft className={`transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsSidebarOpen(false); // Close on mobile
                  }}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeItem === item.name ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isSidebarCollapsed && <span className="ml-3">{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white px-4 py-3 shadow-sm sticky top-0 z-30 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-1 rounded hover:bg-gray-200" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-bold">{activeItem}</h1>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Mobile Search Icon */}
            <button className="sm:hidden p-2 rounded-full hover:bg-gray-200">
              <Search className="text-gray-500" size={20} />
            </button>

            {/* Desktop Search Bar */}
            <div className="hidden sm:block relative w-64">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <img src={user} alt="User" className="w-8 h-8 rounded-full" />
              <span className="hidden sm:block text-sm font-medium">Mohamed Dhif</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto w-full">
            {activeItem === 'Calendrier' && <CalendarComponent />}
            {activeItem === 'Projets' && <ProjectsList projects={sampleProjects} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
