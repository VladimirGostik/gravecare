import React, { useState } from 'react';
import { useSettings } from '../Context/SettingsContext'; // Načítanie kontextu

const LanguageSettings = () => {
  const { selectedLanguage, handleLanguageChange, languages } = useSettings(); // Načítanie z kontextu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Stav pre otvorenie/zatvorenie dropdownu

  // Funkcia na otvorenie/zatvorenie dropdownu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Funkcia na výber jazyka a zatvorenie dropdownu
  const selectLanguage = (code) => {
    handleLanguageChange(code);
    setIsDropdownOpen(false); // Zatvorenie dropdownu po výbere
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="bg-customSideBar p-4 mb-4 rounded-2xl relative">
      <h2 className="text-2xl font-semibold mb-2">Nastavenie jazyka</h2>
      <div className="relative">
        {/* Aktuálne vybraný jazyk */}
        <button
          onClick={toggleDropdown}
          className="w-full flex items-center justify-between p-2 bg-purple-50 border rounded"
        >
          <span className="flex items-center">
            {currentLanguage && (
              <img
                src={currentLanguage.flag}
                alt={currentLanguage.name}
                className="inline-block w-6 h-6 mr-2"
              />
            )}
            {currentLanguage ? currentLanguage.name : 'Vyberte jazyk'}
          </span>
          <span>▼</span>
        </button>

        {/* Dropdown možnosti s vlajkami */}
        {isDropdownOpen && (
          <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded shadow-lg z-10">
            <ul className="text-gray-700">
              {languages.map((language) => (
                <li
                  key={language.code}
                  className="px-4 py-2 hover:bg-purple-100 flex items-center cursor-pointer"
                  onClick={() => selectLanguage(language.code)}
                >
                  <img
                    src={language.flag}
                    alt={language.name}
                    className="inline-block w-6 h-6 mr-2"
                  />
                  {language.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSettings;
