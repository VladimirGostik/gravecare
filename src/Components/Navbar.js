import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useSettings } from '../Context/SettingsContext'; // Pridávame SettingsContext pre jazyky

const Navbar = ({ companyLogo }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // Pre dropdown pre jazyky
  const { logout } = useAuth(); // Prístup k funkcii logout z AuthContext
  const { languages, selectedLanguage, handleLanguageChange } = useSettings(); // Prístup k jazykovým nastaveniam
  const navigate = useNavigate(); // Použi useNavigate na presmerovanie

  // Funkcia na otváranie a zatváranie dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsLanguageDropdownOpen(false); // Zatvorí menu jazykov, keď je otvorené menu podnikateľa
  };

  // Funkcia na otváranie a zatváranie dropdown menu pre jazyky
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsDropdownOpen(false); // Zatvorí menu podnikateľa, keď je otvorené menu jazykov
  };

  // Funkcia na odhlásenie používateľa
  const handleLogout = async () => {
    try {
      logout(); // Zavolaj funkciu na odhlásenie z AuthContext
      navigate('/'); // Presmeruj na hlavnú stránku po úspešnom odhlásení
    } catch (error) {
      console.error('Odhlásenie zlyhalo', error);
    }
  };

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage);

  return (
    <nav className="bg-customPurpleNavbar p-3 rounded-[40px] shadow-lg mx-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Gravecare */}
        <div className="ml-6 text-4xl font-bold text-white text-shadow-lg text-border">
          <Link to="/business/orders/confirm">Gravecare</Link>
        </div>

        {/* Podnikateľské logo alebo predvolený obrázok */}
        <div className="relative mr-6 flex items-center">
          {/* Dropdown pre výber jazyka */}
          <div className="relative ">
            <button onClick={toggleLanguageDropdown} className="focus:outline-none flex items-center">
              <span className="text-white mr-2">
                {currentLanguage ? currentLanguage.name : 'Language'}
              </span>
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
              className={`absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-lg transition-all duration-700 ease-in-out ${
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
                      setIsLanguageDropdownOpen(false); // Zatvoriť dropdown po výbere jazyka
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

          <button onClick={toggleDropdown} className="focus:outline-none ml-4">
            <img
              src={companyLogo || '/images/profile.png'} // Ak nie je logo, zobrazí predvolený obrázok
              alt="Podnikateľské logo"
              className="w-12 h-12 rounded-full object-cover"
            />
          </button>

          {/* Dropdown menu pre podnikateľa */}
          <div
            className={`absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-lg transition-all duration-700 ease-in-out ${
              isDropdownOpen ? 'max-h-[200px]' : 'max-h-0'
            } overflow-hidden`}
            style={{ transitionProperty: 'max-height' }}
          >
            <ul className="text-gray-700">
              <li className="px-4 py-2 hover:bg-purple-100">
                <Link to="/business/profile/edit">Upraviť profil</Link>
              </li>
              <hr className="my-2 mx-auto w-[90%]" /> {/* Stredová čiara */}
              <li className="px-4 py-2 hover:bg-purple-100">
                <button onClick={handleLogout}>Odhlásiť sa</button> {/* Zavolanie handleLogout */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
