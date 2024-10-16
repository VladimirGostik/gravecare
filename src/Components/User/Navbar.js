import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useSettings } from '../../Context/SettingsContext';
import { useOrders } from '../../Context/OrderContext'; // Importujeme OrderContext

const Navbar = ({ companyLogo }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { user,logout } = useAuth();
  const { languages, selectedLanguage, handleLanguageChange } = useSettings();
  const { fetchByCustomerNotreviewedId } = useOrders(); // Získame funkciu na získanie neohodnotených objednávok
  const [unreviewedOrdersCount, setUnreviewedOrdersCount] = useState(0); // Stav pre počet neohodnotených objednávok

  const navigate = useNavigate();

  // Funkcia na otváranie a zatváranie dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsLanguageDropdownOpen(false);
  };

  // Funkcia na otváranie a zatváranie dropdown menu pre jazyky
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsDropdownOpen(false);
  };

  // Funkcia na odhlásenie používateľa
  const handleLogout = async () => {
    try {
      logout();
      navigate('/');
    } catch (error) {
      console.error('Odhlásenie zlyhalo', error);
    }
  };

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage);

  // Fetch unreviewed orders count
  React.useEffect(() => {
    const fetchUnreviewedOrders = async () => {
      try {
        const unreviewedOrders = await fetchByCustomerNotreviewedId(user.id); // Predpokladáme, že funkcia vráti všetky neohodnotené objednávky
        setUnreviewedOrdersCount(unreviewedOrders.length); // Nastavíme počet neohodnotených objednávok
      } catch (error) {
        console.error('Chyba pri načítavaní neohodnotených objednávok:', error);
      }
    };

    fetchUnreviewedOrders();
  }, [fetchByCustomerNotreviewedId]);

  console.log(unreviewedOrdersCount);

  return (
    <nav className="bg-customPurpleNavbar p-3 rounded-[40px] shadow-lg mx-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Gravecare */}
        <div className="ml-6 text-4xl font-bold text-white text-shadow-lg text-border">
          <Link to="/business/orders/confirm">Gravecare</Link>
        </div>

        {/* Podnikateľské logo alebo predvolený obrázok */}
        <div className="relative mr-6 flex items-center">
          {/* Správa objednávok s počtom neohodnotených */}
          <div className="ml-6 text-md text-white text-shadow-lg text-border relative">
            <Link to="/orders" className="flex items-center z-50">
              Správa objednávok
              {unreviewedOrdersCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center absolute -top-2 -right-4">
                  {unreviewedOrdersCount}
                </span>
              )}
            </Link>
          </div>

          {/* Tlačidlo pre podnikateľské logo */}
          <button onClick={toggleDropdown} className="focus:outline-none ml-6">
            <img
              src={companyLogo || '/images/profile.png'}
              alt="Podnikateľské logo"
              className="w-12 h-12 rounded-full object-cover"
            />
          </button>

          <div className="relative ml-2">
            <button onClick={toggleLanguageDropdown} className="focus:outline-none flex items-center">
              {currentLanguage && (
                <img
                  src={currentLanguage.flag}
                  alt={currentLanguage.name}
                  className="w-8 h-8"
                />
              )}
            </button>

            {/* Dropdown menu pre jazyky */}
            <div
              className={`absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-lg transition-all duration-700 ease-in-out z-50 ${
                isLanguageDropdownOpen ? 'max-h-[200px]' : 'max-h-0'
              } overflow-hidden`}
              style={{ transitionProperty: 'max-height' }}
            >
              <ul className="text-gray-700">
                {languages.map((language) => (
                  <li
                    key={language.code}
                    className="px-4 py-2 hover:bg-purple-100 flex items-center"
                    onClick={() => {
                      handleLanguageChange(language.code);
                      setIsLanguageDropdownOpen(false);
                    }}
                  >
                    <span className="mr-2">{language.name}</span>
                    <img
                      src={language.flag}
                      alt={language.name}
                      className="w-6 h-6"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-lg transition-all duration-700 ease-in-out z-50 ${
              isDropdownOpen ? 'max-h-[200px]' : 'max-h-0'
            } overflow-hidden`}
            style={{ transitionProperty: 'max-height' }}
          >
            <ul className="text-gray-700">
              <li className="px-4 py-2 hover:bg-purple-100">
                <Link to="/settings">Nastavenia</Link>
              </li>
              <hr className="my-2 mx-auto w-[90%]" />
              <li className="px-4 py-2 hover:bg-purple-100">
                <button onClick={handleLogout}>Odhlásiť sa</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
