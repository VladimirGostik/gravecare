import React from 'react';
import Navbar from '../Components/User/Navbar';

const UserLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="w-full mx-auto pr-4">
         {children}
      </div>
    </div>
  );
};

export default UserLayout;
