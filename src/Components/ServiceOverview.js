// ServiceOverview.js
import React, { useState } from 'react';
import { useService } from '../Context/ServiceContext';

const ServiceOverview = ({ services }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCemetery, setSelectedCemetery] = useState(null);
  const { cemeteriesData } = useService();

  // Kombinovanie služieb s informáciami o cintorínoch
  const servicesWithCemeteryInfo = services.map((service) => {
    const cemetery = cemeteriesData.find(
      (cem) => cem.id === service.id_cementery
    );
    return {
      ...service,
      cemeteryName: cemetery ? cemetery.name : 'Neznámy cintorín',
      city: cemetery ? cemetery.city : 'Neznáme mesto',
    };
  });

  // Zoskupenie služieb podľa mesta a cintorína
  const servicesByCity = servicesWithCemeteryInfo.reduce(
    (acc, service) => {
      const { city, id_cementery, cemeteryName } = service;
      if (!acc[city]) {
        acc[city] = {};
      }
      if (!acc[city][id_cementery]) {
        acc[city][id_cementery] = {
          name: cemeteryName,
          services: [],
        };
      }
      acc[city][id_cementery].services.push(service);
      return acc;
    },
    {}
  );

  // Spracovanie kliknutia na mesto
  const handleCityClick = (city) => {
    setSelectedCity(selectedCity === city ? null : city);
    setSelectedCemetery(null);
  };

  // Spracovanie kliknutia na cintorín
  const handleCemeteryClick = (id_cementery) => {
    setSelectedCemetery(
      selectedCemetery === id_cementery ? null : id_cementery
    );
  };

  return (
    <div className="flex flex-wrap h-full mx-8">
      {/* Panel pre mestá */}
      <div className="w-full md:w-1/4 bg-gray-200 p-4 rounded-l-lg shadow-md">
        <h2 className="font-bold text-xl mb-2">Mestá</h2>
        <ul>
          {Object.keys(servicesByCity).map((city) => (
            <li key={city}>
              <button
                className={`w-full text-left p-2 rounded-lg hover:bg-gray-300 transition duration-200 ${
                  selectedCity === city ? 'bg-gray-400' : ''
                }`}
                onClick={() => handleCityClick(city)}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Panel pre cintoríny a služby */}
      <div className="w-full md:w-3/4 bg-white p-4 rounded-r-lg shadow-md">
        <h2 className="font-bold text-xl mb-2">Cintoríny a služby</h2>
        {selectedCity ? (
          <div>
            {Object.keys(servicesByCity[selectedCity]).map(
              (id_cementery) => (
                <div key={id_cementery} className="mb-4">
                  <h3
                    className="font-semibold text-lg cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() =>
                      handleCemeteryClick(id_cementery)
                    }
                  >
                    {servicesByCity[selectedCity][id_cementery].name}
                  </h3>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      selectedCemetery === id_cementery
                        ? 'max-h-screen opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="pl-4">
                      {servicesByCity[selectedCity][
                        id_cementery
                      ].services.map((service) => (
                        <li
                          key={service.id}
                          className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-lg"
                        >
                          <div>
                            <p className="font-bold break-words">
                              {service.name}
                            </p>
                            <p className="break-words">
                              {service.description}
                            </p>
                          </div>
                          <span className="font-semibold break-words">
                            {service.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-gray-500">
            Vyberte mesto pre zobrazenie cintorínov a služieb.
          </p>
        )}
      </div>
    </div>
  );
};

export default ServiceOverview;
