import React, { useState } from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import {
  ChevronLeft,
  Menu,
  Search,
  User as UserIcon,
  LogOut,
} from 'lucide-react';
import user from '../assets/profile-pictures/user1.jpg';
import { menuItems } from '../constants/index';
import { useNavigate } from 'react-router-dom';

// Sidebar component
const Sidebar = ({ isOpen, isCollapsed, toggleCollapse }) => {
  return (
    <div className={`fixed top-0 left-0 z-50 h-full bg-white border-r-2 shadow-none 
      transform will-change-transform transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0 md:relative md:flex md:flex-col
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      <div className="px-4 py-4 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">Notion</h1>}
        <button
          onClick={toggleCollapse}
          className="p-1 rounded-full hover:bg-gray-200 md:block"
        >
          <ChevronLeft className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `h-12 w-full flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// Header component
const Header = ({ activeItem, toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const navigate = useNavigate();

  return (
    <div className="bg-white px-4 py-2 border-b-2 sticky top-0 z-30 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-1 rounded hover:bg-gray-200" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4 ml-auto relative">
        <button className="sm:hidden p-2 rounded-full hover:bg-gray-200">
          <Search className="text-gray-500" size={20} />
        </button>

        <div className="hidden sm:block relative w-64">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* Menu Profil */}
        <div className="relative"> 
          <button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img src={user} alt="User" className="w-8 h-8 rounded-full" />
            <span className="hidden lg:block text-sm font-medium">Mohamed Dhif</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
              <button
                onClick={() => {
                  navigate('/u/profil');
                  setShowProfileMenu(false); }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                >
                <UserIcon size={16} /> Mon Profil
              </button>

              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-red-500">
                <LogOut size={16} /> Se déconnecter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// MainLayout component
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const routeTitle = {
    '/dashboard': 'Tableau de Bord',
    '/calendrier': 'Calendrier',
    '/projets': 'Projets',
    '/message': 'Messages',
    '/board': 'Tableau',
    '/notification': 'Notifications',
    '/client': 'Clients',
    '/setting': 'Paramètres',
    '/plans': 'Plans',
  };

  const location = useLocation();
  const activeItem = routeTitle[location.pathname] || 'Tableau de Bord';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
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
