import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

const BusinessLayout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main layout wrapper */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-grow p-6 overflow-x-hidden">
          <div className="w-full mx-auto pr-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusinessLayout;
