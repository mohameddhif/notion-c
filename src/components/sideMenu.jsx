import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import user from '../assets/profile-pictures/user1.jpg';
import {menuItems} from '../constants/index';


const SideMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`bg-white shadow-lg flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between border-b">
          {!collapsed && <h1 className="text-xl font-bold">Notion</h1>}
          <button 
            onClick={toggleCollapse}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} size={20} />
          </button>
        </div>

        {!collapsed && (
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div>
                <img src={user} alt="pp" className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Mohamed Dhif</p>
              </div>
            </div>
          </div>
        )}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeItem === item.name ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
      </div>
      
    )
}

export default SideMenu;