import React from 'react';
import { Menu, Search } from 'lucide-react';
import user from '../assets/profile-pictures/user1.jpg';

const Header = ({ activeItem, toggleSidebar }) => {
  return (
    <div className="bg-white px-4 py-2 border-b-2 sticky top-0 z-30 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-1 rounded hover:bg-gray-200" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold">{activeItem}</h1>
      </div>

      <div className="flex items-center gap-4 ml-auto">
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

        <div className="flex items-center space-x-2">
          <img src={user} alt="User" className="w-8 h-8 rounded-full" />
          <span className="hidden sm:block text-sm font-medium">Mohamed Dhif</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
