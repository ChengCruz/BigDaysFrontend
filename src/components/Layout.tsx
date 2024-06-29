// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import './Layout.css';
// import Navigation from './Navigation';

// const Layout: React.FC = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="bg-weddingGold text-white py-4 shadow-md">
//         <div className="container mx-auto flex justify-between items-center">
//         <Navigation />
//         </div>
//       </header>
//       <main className="flex-grow bg-weddingWhite py-8">
//         <div className="container mx-auto">
//           <Outlet />
//         </div>
//       </main>
//       <footer className="bg-weddingGold text-white py-4">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2024 Wedding Management System</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-grow flex flex-col transition-all duration-200 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header />
        <main className="flex-grow bg-weddingWhite py-8">
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
        <footer className="bg-weddingGold text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Wedding Management System</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
