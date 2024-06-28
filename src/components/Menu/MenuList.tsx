import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from '../CustomModal';
import MenuForm from './MenuForm';

interface Menu {
  id: number;
  name: string;
  description: string;
}

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (menu: Menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMenu(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Menus"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <div key={menu.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-script text-weddingGold mb-2">{menu.name}</h2>
            <p className="text-gray-700 mb-1"><strong>Description:</strong> {menu.description}</p>
            <button
              onClick={() => openModal(menu)}
              className="mt-4 bg-weddingPink text-white rounded p-2 hover:bg-pink-600 transition duration-200"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      {selectedMenu && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal} title="Edit Menu">
          <MenuForm initialData={selectedMenu} />
        </CustomModal>
      )}
    </div>
  );
};

export default MenuList;
