import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TabNavigation = () => {
  const location = useLocation(); // Získanie aktuálnej cesty

  return (
    <div className="flex justify-center space-x-4">
      <Link to="/business/orders/confirm">
        <button
          className={`rounded-full px-4 py-2 ${
            location.pathname === '/business/orders/confirm'
              ? 'bg-customSideBar text-black' // Aktívny button
              : 'bg-customPurpleNavbar text-white'
          }`}
        >
          Potvrdenie objednávky
        </button>
      </Link>

      <Link to="/business/orders/pending">
        <button
          className={`rounded-full px-4 py-2 ${
            location.pathname === '/business/orders/pending'
            ? 'bg-customSideBar text-black ' // Aktívny button
            : 'bg-customPurpleNavbar text-white'
          }`}
        >
          Nevybavené objednávky
        </button>
      </Link>

      <Link to="/business/orders/waiting">
        <button
          className={`rounded-full px-4 py-2 ${
            location.pathname === '/business/orders/waiting'
            ? 'bg-customSideBar text-black ' // Aktívny button
            : 'bg-customPurpleNavbar text-white'
          }`}
        >
          Čakajúce na ohodnotenie
        </button>
      </Link>

      <Link to="/business/orders/completed">
        <button
          className={`rounded-full px-4 py-2 ${
            location.pathname === '/business/orders/completed'
            ? 'bg-customSideBar text-black' // Aktívny button
            : 'bg-customPurpleNavbar text-white'
          }`}
        >
          Vybavené objednávky
        </button>
      </Link>
    </div>
  );
};

export default TabNavigation;
