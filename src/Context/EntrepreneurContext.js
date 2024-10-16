import React, { createContext, useContext, useState } from 'react';
import { useService } from './ServiceContext';

// Vytvorenie kontextu pre podnikateľov
const EntrepreneurContext = createContext();

// Poskytovateľ kontextu pre podnikateľov
export const EntrepreneurProvider = ({ children }) => {
    const { services, cemeteriesData } = useService();

    // Funkcia na získanie informácií o cintoríne na základe ID
    const getCemeteryById = (id) => cemeteriesData.find((cemetery) => cemetery.id === id);
  
  // Mock data for entrepreneurs
  const [entrepreneurs] = useState([
    { 
      id: 1, 
      companyLogo: null, 
      companyName: 'Cintorínske služby',
      phoneNumber: "987-654-3210",
      description: "Navigačné tlačidlá: Tieto tlačidlá umožňujú používateľovi presunúť sa medzi sekciami Portfólio služieb a Ponuka služieb s plynulým posunom (scroll). Aktívna sekcia má iné zafarbenie pre lepšiu používateľskú skúsenosť.",
      averageRating: 4.5, 
      services: services
        .filter(service => [1, 2].includes(service.id))
        .map(service => ({
          ...service,
          cemetery: getCemeteryById(service.id_cementery) // Pridáme info o cintoríne
        }))
    },
    { 
      id: 2,
      companyLogo: null,
      companyName: 'Záhradnícke práce', 
      phoneNumber: "987-654-3210",
      description: "Navigačné tlačidlá: Tieto tlačidlá umožňujú používateľovi presunúť sa medzi sekciami Portfólio služieb a Ponuka služieb s plynulým posunom (scroll). Aktívna sekcia má iné zafarbenie pre lepšiu používateľskú skúsenosť.",
      averageRating: 4.2, 
      services: services
        .filter(service => [3, 4 ,13 ,14 ,18 ,20].includes(service.id))
        .map(service => ({
          ...service,
          cemetery: getCemeteryById(service.id_cementery) 
        }))
    },
    { 
      id: 3, 
      companyLogo: null,
      companyName: 'Oprava náhrobkova',
      phoneNumber: "987-654-3210",
      description: "Navigačné tlačidlá: Tieto tlačidlá umožňujú používateľovi presunúť sa medzi sekciami Portfólio služieb a Ponuka služieb s plynulým posunom (scroll). Aktívna sekcia má iné zafarbenie pre lepšiu používateľskú skúsenosť.",
      averageRating: 4.8, 
      services: services
        .filter(service => [5, 6].includes(service.id))
        .map(service => ({
          ...service,
          cemetery: getCemeteryById(service.id_cementery) 
        }))
    },
    { 
      id: 4, 
      companyLogo: null,
      companyName: 'Výzdoba hrobov',
      phoneNumber: "987-654-3210",
      description: "Navigačné tlačidlá: Tieto tlačidlá umožňujú používateľovi presunúť sa medzi sekciami Portfólio služieb a Ponuka služieb s plynulým posunom (scroll). Aktívna sekcia má iné zafarbenie pre lepšiu používateľskú skúsenosť.",
      averageRating: 4.7, 
      services: services
        .filter(service => [7, 8].includes(service.id))
        .map(service => ({
          ...service,
          cemetery: getCemeteryById(service.id_cementery) 
        }))
    },
    { 
      id: 5, 
      companyLogo: null,
      companyName: 'Údržba pomníkov', 
      phoneNumber: "987-654-3210",
      description: "Navigačné tlačidlá: Tieto tlačidlá umožňujú používateľovi presunúť sa medzi sekciami Portfólio služieb a Ponuka služieb s plynulým posunom (scroll). Aktívna sekcia má iné zafarbenie pre lepšiu používateľskú skúsenosť.",
      averageRating: 4.9, 
      services: services
        .filter(service => [9, 10].includes(service.id))
        .map(service => ({
          ...service,
          cemetery: getCemeteryById(service.id_cementery) 
        }))
    },
    { 
      id: 6, 
      companyLogo: null,
      companyName: 'Kamenárske služby', 
      phoneNumber: "987-654-3210",
      description: "Navigačné tlačidlá: Tieto tlačidlá umožňujú používateľovi presunúť sa medzi sekciami Portfólio služieb a Ponuka služieb s plynulým posunom (scroll). Aktívna sekcia má iné zafarbenie pre lepšiu používateľskú skúsenosť.",
      averageRating: 4.1, 
      services: services
        .filter(service => [11, 12].includes(service.id))
        .map(service => ({
          ...service,
          cemetery: getCemeteryById(service.id_cementery) 
        }))
    },
    { 
      id: 7, 
      companyLogo: null,
      companyName: 'Starostlivosť o hroby',
      phoneNumber: "987-654-3210",
      description: "Navigačné tlačidlá: Tieto tlačidlá umožňujú používateľovi presunúť sa medzi sekciami Portfólio služieb a Ponuka služieb s plynulým posunom (scroll). Aktívna sekcia má iné zafarbenie pre lepšiu používateľskú skúsenosť.",
      averageRating: 4.6, 
      services: services
        .filter(service => [13, 14].includes(service.id))
        .map(service => ({
          ...service,
          cemetery: getCemeteryById(service.id_cementery) 
        }))
    },
    { 
      id: 8, 
      companyLogo: null,
      companyName: 'Pomníkové práce', 
      phoneNumber: "987-654-3210",
      description: "Navigačné tlačidlá: Tieto tlačidlá umožňujú používateľovi presunúť sa medzi sekciami Portfólio služieb a Ponuka služieb s plynulým posunom (scroll). Aktívna sekcia má iné zafarbenie pre lepšiu používateľskú skúsenosť.",
      averageRating: 4.3, 
      services: services
        .filter(service => [15, 16].includes(service.id))
        .map(service => ({
          ...service,
          cemetery: getCemeteryById(service.id_cementery) 
        }))
    },
    { 
      id: 9, 
      companyLogo: null,
      companyName: 'Záhradnícke úpravy', 
      phoneNumber: "987-654-3210",
      description: "Navigačné tlačidlá: Tieto tlačidlá umožňujú používateľovi presunúť sa medzi sekciami Portfólio služieb a Ponuka služieb s plynulým posunom (scroll). Aktívna sekcia má iné zafarbenie pre lepšiu používateľskú skúsenosť.",
      averageRating: 4.0, 
      services: services
        .filter(service => [17, 18].includes(service.id))
        .map(service => ({
          ...service,
          cemetery: getCemeteryById(service.id_cementery) 
        }))
    },
    { 
      id: 10, 
      companyLogo: null,
      companyName: 'Komplexná starostlivosť', 
      phoneNumber: "987-654-3210",
      description: "Navigačné tlačidlá: Tieto tlačidlá umožňujú používateľovi presunúť sa medzi sekciami Portfólio služieb a Ponuka služieb s plynulým posunom (scroll). Aktívna sekcia má iné zafarbenie pre lepšiu používateľskú skúsenosť.",
      averageRating: 4.4, 
      services: services
        .filter(service => [19, 20].includes(service.id))
        .map(service => ({
          ...service,
          cemetery: getCemeteryById(service.id_cementery) 
        }))
    }
  ]);

  // Filter entrepreneurs by name, services, or other criteria
  const filterEntrepreneurs = (filterName, filterService, filterCemetery) => {
    return entrepreneurs.filter((entrepreneur) => {
      // Filtrovanie podľa mena
      const matchesName = filterName.length > 0
        ? filterName.includes(entrepreneur.companyName)
        : true;
  
      // Filtrovanie podľa služieb
      const matchesService = filterService.length > 0
        ? entrepreneur.services.some((service) =>
            filterService.includes(service.name)
          )
        : true;
  
      // Filtrovanie podľa cintorína
      const matchesCemetery = filterCemetery
        ? entrepreneur.services.some((service) => {
            const cemetery = cemeteriesData.find((c) => c.id === service.id_cementery);
            return cemetery && cemetery.name === filterCemetery;
          })
        : true;
  
      // Podnikateľ sa zobrazí, ak spĺňa všetky podmienky
      return matchesName && matchesService && matchesCemetery;
    });
  };
  
  
  
  return (
    <EntrepreneurContext.Provider value={{ entrepreneurs, filterEntrepreneurs }}>
      {children}
    </EntrepreneurContext.Provider>
  );
};

// Hook na použitie kontextu
export const useEntrepreneurs = () => useContext(EntrepreneurContext);
