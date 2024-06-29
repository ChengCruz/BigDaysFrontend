import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-script text-weddingGold mb-4">
        Welcome to the Wedding Management System
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Manage your wedding events, guests, tables, RSVPs, and menus
        efficiently.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link
          to="/bigdays"
          className="bg-weddingPink text-white rounded-lg shadow-lg p-6 hover:bg-pink-300 transition"
        >
          <h3 className="text-2xl mb-2">Big Days &rarr;</h3>
          <p>Manage your wedding events and details.</p>
        </Link>
        <Link
          to="/guests"
          className="bg-weddingPink text-white rounded-lg shadow-lg p-6 hover:bg-pink-300 transition"
        >
          <h3 className="text-2xl mb-2">Guests &rarr;</h3>
          <p>Manage guest information and invitations.</p>
        </Link>
        <Link
          to="/tables"
          className="bg-weddingPink text-white rounded-lg shadow-lg p-6 hover:bg-pink-300 transition"
        >
          <h3 className="text-2xl mb-2">Tables &rarr;</h3>
          <p>Organize your seating arrangements.</p>
        </Link>
        <Link
          to="/rsvps"
          className="bg-weddingPink text-white rounded-lg shadow-lg p-6 hover:bg-pink-300 transition"
        >
          <h3 className="text-2xl mb-2">RSVPs &rarr;</h3>
          <p>Track RSVPs and guest responses.</p>
        </Link>
        <Link
          to="/menus"
          className="bg-weddingPink text-white rounded-lg shadow-lg p-6 hover:bg-pink-300 transition"
        >
          <h3 className="text-2xl mb-2">Menus &rarr;</h3>
          <p>Plan and manage your wedding menus.</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomePage: React.FC = () => {
//   return (
//     <div className="text-center">
//       <h1 className="text-5xl font-bold text-weddingGold mb-6">Welcome to the Wedding Planner</h1>
//       <p className="text-xl mb-6">Plan your wedding seamlessly with our tools.</p>
//       <div className="flex justify-center space-x-4">
//         <Link to="/bigdays" className="bg-weddingPink text-white rounded p-4 hover:bg-pink-600 transition duration-200">
//           Manage Big Days
//         </Link>
//         <Link to="/guests" className="bg-weddingPink text-white rounded p-4 hover:bg-pink-600 transition duration-200">
//           Manage Guests
//         </Link>
//         <Link to="/tables" className="bg-weddingPink text-white rounded p-4 hover:bg-pink-600 transition duration-200">
//           Manage Tables
//         </Link>
//         <Link to="/rsvps" className="bg-weddingPink text-white rounded p-4 hover:bg-pink-600 transition duration-200">
//           Manage RSVPs
//         </Link>
//         <Link to="/menus" className="bg-weddingPink text-white rounded p-4 hover:bg-pink-600 transition duration-200">
//           Manage Menus
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
