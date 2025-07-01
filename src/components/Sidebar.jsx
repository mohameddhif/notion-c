import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { menuItems } from '../constants/index';

const Sidebar = ({ isOpen, isCollapsed, toggleSidebar, toggleCollapse }) => {
  return (
    <div className={`fixed top-0 left-0 z-50 h-full bg-white border-r-2 transform will-change-transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:relative md:flex md:flex-col
            ${isCollapsed ? 'w-16' : 'w-64'}
          `}
        >
      
      <div className="px-4 py-4 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">Notion</h1>}
        <button
          onClick={isOpen ? toggleSidebar : toggleCollapse}
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
                  `w-full flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`
                }
                onClick={toggleSidebar}
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

export default Sidebar;
