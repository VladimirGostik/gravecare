import React, { useState } from 'react';
import { useService } from '../Context/ServiceContext'; // Importujeme kontext
import AddServiceModal from '../Modals/AddServiceModal';
import EditServiceModal from '../Modals/EditServiceModal';

const ServiceOverviewEdit = () => {
  const {
    services,
    cemeteriesData,
  } = useService();
  
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCemeteryId, setSelectedCemeteryId] = useState(null);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  // Získanie unikátnych miest a cintorínov zo služieb
  const citiesAndCemeteries = services.reduce((acc, service) => {
    const cemetery = cemeteriesData.find((c) => c.id === service.id_cementery);
    if (cemetery) {
      const { city, name, id } = cemetery;
      if (!acc[city]) {
        acc[city] = {};
      }
      if (!acc[city][id]) {
        acc[city][id] = { id, name };
      }
    }
    return acc;
  }, {});

  const handleCityClick = (city) => {
    setSelectedCity(selectedCity === city ? null : city);
    setSelectedCemeteryId(null);
  };

  const handleCemeteryClick = (id_cemetery) => {
    setSelectedCemeteryId(selectedCemeteryId === id_cemetery ? null : id_cemetery);
  };

  const handleServiceClick = (service) => {
    setCurrentService(service);
    setIsEditServiceModalOpen(true);
  };

  return (
    <div className="flex flex-wrap h-full rounded-[50px] p-2">
      {/* Ľavý panel pre mestá */}
      <div className="w-full md:w-1/4 bg-gray-200 p-4 rounded-l-[50px] shadow-md ">
        <h2 className="font-bold text-xl mb-2">Mestá</h2>
        {Object.keys(citiesAndCemeteries).length === 0 ? (
          <div className="text-center mt-4">
            <button
              className="w-full text-left p-2 rounded-2xl bg-green-500 hover:bg-green-300 transition duration-200"
              onClick={() => setIsAddServiceModalOpen(true)}
            >
              Pridať službu +
            </button>
          </div>
        ) : (
          <ul>
            {Object.keys(citiesAndCemeteries).map((city) => (
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
        )}
      </div>

      {/* Pravý panel pre cintoríny a služby */}
      <div className="w-full md:w-3/4 bg-white p-4 rounded-r-[50px] shadow-md">
        <h2 className="font-bold text-xl mb-2">Cintoríny a služby</h2>
        {selectedCity ? (
          <div>
            {Object.values(citiesAndCemeteries[selectedCity]).map((cemetery) => (
              <div key={cemetery.id} className="mb-4">
                <h3
                  className="font-semibold text-lg cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => handleCemeteryClick(cemetery.id)}
                >
                  {cemetery.name}
                </h3>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    selectedCemeteryId === cemetery.id
                      ? 'max-h-screen opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="mx-4">
                    {services
                      .filter((service) => service.id_cementery === cemetery.id)
                      .map((service) => (
                        <li
                          key={service.id}
                          className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                          onClick={() => handleServiceClick(service)}
                        >
                          <div>
                            <p className="font-bold break-words">{service.name}</p>
                            <p className="break-words">{service.description}</p>
                          </div>
                          <span className="font-semibold break-words">{service.price}</span>
                        </li>
                      ))}
                    <li>
                      <button
                        className="w-full text-left p-2 rounded-2xl bg-green-500 hover:bg-green-300 transition duration-200"
                        onClick={() => {
                          setSelectedCemeteryId(cemetery.id);
                          setIsAddServiceModalOpen(true);
                        }}
                      >
                        Pridať službu +
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Vyberte mesto pre zobrazenie cintorínov a služieb.
          </p>
        )}
      </div>

      {/* Modálne okná */}
      {isAddServiceModalOpen && selectedCity && selectedCemeteryId && (
        <AddServiceModal
          setIsOpen={setIsAddServiceModalOpen}
          city={selectedCity}
          id_cemetery={selectedCemeteryId}
        />
      )}
      {isEditServiceModalOpen && currentService && (
        <EditServiceModal
          setIsOpen={setIsEditServiceModalOpen}
          service={currentService}
        />
      )}
    </div>
  );
};

export default ServiceOverviewEdit;
