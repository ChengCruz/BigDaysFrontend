import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';
import Navigation from './Navigation';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-weddingGold text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
        <Navigation />
        </div>
      </header>
      <main className="flex-grow bg-weddingWhite py-8">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      <footer className="bg-weddingGold text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Wedding Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
