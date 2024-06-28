import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Menu {
  id: number;
  name: string;
  description: string;
}

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    async function fetchMenus() {
      try {
        const response = await axios.get<Menu[]>('/api/menus');
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    }
    fetchMenus();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {menus.map((menu) => (
        <div key={menu.id} className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-script text-weddingGold mb-2">{menu.name}</h2>
          <p className="text-gray-700">{menu.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
