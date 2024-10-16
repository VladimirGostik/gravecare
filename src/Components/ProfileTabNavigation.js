import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProfileTabNavigation = () => {
  const location = useLocation(); // Získavame aktuálnu cestu pre aktívny stav

  return (
    <div className="flex justify-center space-x-4">
      <Link
        to="/business/profile/edit"
        className={`px-6 py-2 rounded-full ${
          location.pathname === '/business/profile/edit'
              ? 'bg-customSideBar text-black' // Aktívny button
              : 'bg-customPurpleNavbar text-white'
        }`}
      >
        Zmena údajov
      </Link>
      <Link
        to="/business/profile/portfolio"
        className={`px-6 py-2 rounded-full ${
          location.pathname === '/business/profile/portfolio'
              ? 'bg-customSideBar text-black' // Aktívny button
              : 'bg-customPurpleNavbar text-white'
        }`}
      >
        Nastavenie portfólia
      </Link>
      <Link
        to="/business/profile/appointments"
        className={`px-6 py-2 rounded-full ${
          location.pathname === '/business/profile/appointments'
              ? 'bg-customSideBar text-black' // Aktívny button
              : 'bg-customPurpleNavbar text-white'
        }`}
      >
        Správa termínov
      </Link>
      <Link
        to="/business/profile/services"
        className={`px-6 py-2 rounded-full ${
          location.pathname === '/business/profile/services'
              ? 'bg-customSideBar text-black' // Aktívny button
              : 'bg-customPurpleNavbar text-white'
        }`}
      >
        Úprava služieb
      </Link>
    </div>
  );
};

export default ProfileTabNavigation;
