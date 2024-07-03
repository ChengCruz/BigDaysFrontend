import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed h-screen ${isOpen ? 'w-64' : 'w-16'} bg-weddingPink text-white transition-width duration-200`}>
      <div className="p-4 flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${isOpen ? 'block' : 'hidden'}`}>Navigation</h1>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <ul className={`mt-4 mx-4 ${isOpen ? 'block' : 'hidden'}`}>
        <li className="mb-4">
          <Link to="/" className="text-xl hover:text-weddingGold">Home</Link>
        </li>
        <li className="mb-4">
          <Link to="/bigdays" className="text-xl hover:text-weddingGold">Big Days</Link>
        </li>
        <li className="mb-4">
          <Link to="/guests" className="text-xl hover:text-weddingGold">Guests</Link>
        </li>
        <li className="mb-4">
          <Link to="/tables" className="text-xl hover:text-weddingGold">Tables</Link>
        </li>
        <li className="mb-4">
          <Link to="/rsvps" className="text-xl hover:text-weddingGold">RSVPs</Link>
        </li>
        <li className="mb-4">
          <Link to="/menus" className="text-xl hover:text-weddingGold">Menus</Link>
        </li>
        <li>
          <Link to="/organizer-dashboard" className="text-xl hover:text-weddingGold">DashBoard</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
