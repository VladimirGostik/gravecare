import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation(); // Získavame aktuálnu cestu
  const [isOrdersOpen, setIsOrdersOpen] = useState(
    location.pathname.startsWith('/business/orders')
  );
  const [isProfileOpen, setIsProfileOpen] = useState(
    location.pathname.startsWith('/business/profile')
  );

  const toggleOrders = () => setIsOrdersOpen(!isOrdersOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <aside className="bg-customSideBar h-screen p-4 rounded-[40px] shadow-lg w-64 ml-10 mt-6">
      <ul className="space-y-3">
        {/* Správa objednávok */}
        <li className="bg-customPurpleNavbar rounded-[40px] p-4">
          <div
            className="font-bold text-sm flex justify-between items-center cursor-pointer"
            onClick={toggleOrders}
          >
            <span>Správa objednávok</span>
            <span>{isOrdersOpen ? '▲' : '▼'}</span>
          </div>

          {/* Animácia pre zobrazenie/skrytie */}
          <div
            className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
              isOrdersOpen ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <ul className="space-y-2 text-xs my-2 ml-2">
              <li>
                <Link
                  to="/business/orders/confirm"
                  className={`text-black hover:text-purple-900 ${
                    location.pathname === '/business/orders/confirm' ? 'font-bold' : ''
                  }`}
                >
                  Potvrdenie objednávok
                </Link>
              </li>
              <li>
                <Link
                  to="/business/orders/pending"
                  className={`text-black hover:text-purple-900 ${
                    location.pathname === '/business/orders/pending' ? 'font-bold' : ''
                  }`}
                >
                  Nevybavené objednávky
                </Link>
              </li>
              <li>
                <Link
                  to="/business/orders/waiting"
                  className={`text-black hover:text-purple-900 ${
                    location.pathname === '/business/orders/waiting' ? 'font-bold' : ''
                  }`}
                >
                 Čakajúce na ohodnotenie
                </Link>
              </li>
              <li>
                <Link
                  to="/business/orders/completed"
                  className={`text-black hover:text-purple-900 ${
                    location.pathname === '/business/orders/completed' ? 'font-bold' : ''
                  }`}
                >
                  Vybavené objednávky
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Úprava profilu */}
        <li className="bg-customPurpleNavbar rounded-[40px] p-4">
          <div
            className="font-bold text-sm flex justify-between items-center cursor-pointer"
            onClick={toggleProfile}
          >
            <span>Úprava profilu</span>
            <span>{isProfileOpen ? '▲' : '▼'}</span>
          </div>

          {/* Animácia pre zobrazenie/skrytie */}
          <div
            className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
              isProfileOpen ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <ul className="space-y-2 text-xs my-2 ml-2">
              <li>
                <Link
                  to="/business/profile/edit"
                  className={`text-black hover:text-purple-900 ${
                    location.pathname === '/business/profile/edit' ? 'font-bold' : ''
                  }`}
                >
                  Zmena údajov
                </Link>
              </li>
              <li>
                <Link
                  to="/business/profile/portfolio"
                  className={`text-black hover:text-purple-900 ${
                    location.pathname === '/business/profile/portfolio' ? 'font-bold' : ''
                  }`}
                >
                  Nastavenie portfólia
                </Link>
              </li>
              <li>
                <Link
                  to="/business/profile/appointments"
                  className={`text-black hover:text-purple-900 ${
                    location.pathname === '/business/profile/appointments' ? 'font-bold' : ''
                  }`}
                >
                  Správa termínov
                </Link>
              </li>
              <li>
                <Link
                  to="/business/profile/services"
                  className={`text-black hover:text-purple-900 ${
                    location.pathname === '/business/profile/services' ? 'font-bold' : ''
                  }`}
                >
                  Úprava služieb
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Nastavenia */}
        <li className="bg-customPurpleNavbar rounded-[40px] p-3">
          <Link
            to="/business/settings"
            className={`font-bold text-sm text-black hover:text-purple-900 ${
              location.pathname === '/business/settings' ? 'font-bold' : ''
            }`}
          >
            Nastavenia
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
