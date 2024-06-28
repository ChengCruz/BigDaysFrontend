import React from 'react';
import { Link } from 'react-router-dom';
// import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav className="flex items-center">
    <Link to="/" className="text-2xl font-script">Wedding Management</Link>
    <ul className="ml-6 flex space-x-4">
      <li><Link to="/" className="text-lg hover:text-weddingPink">Home</Link></li>
      <li><Link to="/dashboard" className="text-lg hover:text-weddingPink">Dashboard</Link></li>
      <li><Link to="/bigdays" className="text-lg hover:text-weddingPink">Big Days</Link></li>
      <li><Link to="/guests" className="text-lg hover:text-weddingPink">Guests</Link></li>
      <li><Link to="/tables" className="text-lg hover:text-weddingPink">Tables</Link></li>
      <li><Link to="/rsvps" className="text-lg hover:text-weddingPink">RSVPs</Link></li>
      <li><Link to="/menus" className="text-lg hover:text-weddingPink">Menus</Link></li>
    </ul>
  </nav>
  );
};

export default Navigation;
