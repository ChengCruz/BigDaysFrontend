import React from 'react';
import MenuList from '../components/Menu/MenuList';
import MenuForm from '../components/Menu/MenuForm';

const MenuPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">Menus</h1>
      <MenuForm />
      <MenuList />
    </div>
  );
};

export default MenuPage;
