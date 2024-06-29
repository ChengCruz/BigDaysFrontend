import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="bg-weddingGold text-white p-4 shadow-md">
         <Link to="/" className="hover:text-weddingGoldDark"> <h1 className="text-2xl">Wedding Planner</h1></Link>
    
    </div>
  );
};

export default Header;
