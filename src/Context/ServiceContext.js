import React, { createContext, useContext, useState } from 'react';

// Create the context
const ServiceContext = createContext();

// ServiceProvider component
export const ServiceProvider = ({ children }) => {
  // Mock data for services
  const [services, setServices] = useState([
    {
      id: 1,
      entrepreneurId: 9,
      name: 'Údržba hrobov',
      description: 'Komplexná údržba hrobových miest vrátane čistenia a výzdoby.',
      price: '100 EUR',
      id_cementery: 1
    },
    {
      id: 2,
      entrepreneurId: 2,
      name: 'Kosenie trávnika',
      description: 'Pravidelné kosenie trávnika okolo hrobových miest.',
      price: '50 EUR',
      id_cementery: 2
    },
    {
      id: 3,
      entrepreneurId: 2,
      name: 'Čistenie pomníka',
      description: 'Čistenie a leštenie pomníkov vrátane výzdoby.',
      price: '80 EUR',
      id_cementery: 3
    },
    {
      id: 4,
      entrepreneurId: 2,
      name: 'Pokládka kvetinovej výzdoby',
      description: 'Výber a pokládka sezónnych kvetín na hrob.',
      price: '60 EUR',
      id_cementery: 4
    },
    {
      id: 5,
      entrepreneurId: 2,
      name: 'Vysadenie stromčekov',
      description: 'Vysadenie ozdobných stromčekov alebo kvetinových záhonov okolo hrobov.',
      price: '120 EUR',
      id_cementery: 5
    },
    {
      id: 6,
      entrepreneurId: 2,
      name: 'Oprava náhrobkov',
      description: 'Oprava poškodených náhrobkov a obnovenie nápisov.',
      price: '200 EUR',
      id_cementery: 6
    },
    {
      id: 7,
      entrepreneurId: 2,
      name: 'Výmena pomníkov',
      description: 'Výmena starých pomníkov za nové alebo renovácia.',
      price: '400 EUR',
      id_cementery: 7
    },
    {
      id: 8,
      entrepreneurId: 2,
      name: 'Výmena pomníkov',
      description: 'Výmena starých pomníkov za nové alebo renovácia fdfd .',
      price: '400 EUR',
      id_cementery: 7
    },
    {
      id: 8,
      entrepreneurId: 2,
      name: 'Výsadba květinových záhonov',
      description: 'Vytvorenie kvetinového záhonu na hrobe.',
      price: '90 EUR',
      id_cementery: 1
    },
    {
      id: 9,
      entrepreneurId: 2,
      name: 'Hrobové úpravy',
      description: 'Úpravy a opravy hrobových miest.',
      price: '150 EUR',
      id_cementery: 2
    },
    {
      id: 10,
      entrepreneurId: 2,
      name: 'Výzdoba na Dušičky',
      description: 'Príprava a výzdoba hrobov na Dušičky.',
      price: '75 EUR',
      id_cementery: 3
    },
    {
      id: 11,
      entrepreneurId: 2,
      name: 'Doplnková výzdoba',
      description: 'Doplnková výzdoba pre hroby na špeciálne príležitosti.',
      price: '50 EUR',
      id_cementery: 4
    },
    {
      id: 12,
      entrepreneurId: 2,
      name: 'Údržba hrobov počas zimy',
      description: 'Údržba hrobov počas zimného obdobia vrátane čistenia snehu.',
      price: '70 EUR',
      id_cementery: 5
    },
    {
      id: 13,
      entrepreneurId: 2,
      name: 'Osadenie náhrobného kameňa',
      description: 'Osadenie nového náhrobného kameňa.',
      price: '300 EUR',
      id_cementery: 6
    },
    {
      id: 14,
      entrepreneurId: 2,
      name: 'Základná údržba',
      description: 'Základná údržba a čistenie hrobov.',
      price: '40 EUR',
      id_cementery: 7
    },
    {
      id: 15,
      entrepreneurId: 2,
      name: 'Kvetinová výzdoba na Vianoce',
      description: 'Vytvorenie kvetinovej výzdoby na hrob na Vianoce.',
      price: '80 EUR',
      id_cementery: 1
    },
    {
      id: 16,
      entrepreneurId: 2,
      name: 'Kosenie okolo hrobov',
      description: 'Kosenie trávy okolo hrobových miest.',
      price: '50 EUR',
      id_cementery: 2
    },
    {
      id: 17,
      entrepreneurId: 2,
      name: 'Oprava poškodeného náhrobku',
      description: 'Oprava poškodeného náhrobku.',
      price: '250 EUR',
      id_cementery: 3
    },
    {
      id: 18,
      entrepreneurId: 2,
      name: 'Pravidelná údržba',
      description: 'Pravidelná údržba a čistenie hrobov.',
      price: '150 EUR',
      id_cementery: 4
    },
    {
      id: 19,
      entrepreneurId: 2,
      name: 'Výsadba kríkov',
      description: 'Výsadba kríkov okolo hrobov.',
      price: '90 EUR',
      id_cementery: 5
    },
    {
      id: 20,
      entrepreneurId: 2,
      name: 'Jarná údržba',
      description: 'Údržba hrobov na jar vrátane kvetinovej výzdoby.',
      price: '70 EUR',
      id_cementery: 6
    }
  ]);

  const [cemeteriesData] = useState([
    { id: 1, city: 'Abovce', name: 'Abovce' },
    { id: 2, city: 'Baka', name: 'Baka' },
    { id: 3, city: 'Banská Bystrica', name: 'Banská Bystrica' },
    { id: 4, city: 'Batizovce', name: 'Batizovce' },
    { id: 5, city: 'Bačkovík', name: 'Bačkovík' },
    { id: 6, city: 'Beckov', name: 'Cintorín Beckov' },
    { id: 7, city: 'Beniakovce', name: 'Beniakovce' },
    { id: 8, city: 'Benice', name: 'Benice' },
    { id: 9, city: 'Beňadiková', name: 'Beňadiková' },
    { id: 10, city: 'Bešeňová', name: 'Cintorín Bešeňová' },
    { id: 11, city: 'Blatná na Ostrove', name: 'Blatná na Ostrove' },
    { id: 12, city: 'Blatné', name: 'Cintorín Blatné' },
    { id: 13, city: 'Bobrov', name: 'Cintorín Bobrov' },
    { id: 14, city: 'Bojničky', name: 'Bojničky' },
    { id: 15, city: 'Boleráz', name: 'Boleráz' },
    { id: 16, city: 'Boleráz', name: 'Klčovany' },
    { id: 17, city: 'Borinka', name: 'Borinka' },
    { id: 18, city: 'Borský Svätý Jur', name: 'Cintorín Borský Svätý Jur' },
    { id: 19, city: 'Borčice', name: 'Borčice' },
    { id: 20, city: 'Bošáca', name: 'Cintorín Bošáca' },
    { id: 21, city: 'Bratislava', name: 'PIETNE MIESTO – PAMÄTNÍK ŽELEZNIČIAROV' },
    { id: 22, city: 'Bratislava - Devín', name: 'Cintorín Devín' },
    { id: 23, city: 'Bratislava - Dúbravka', name: 'Cintorín Dúbravka' },
    { id: 24, city: 'Bratislava - Karlova Ves', name: 'Cintorín Karlova Ves' },
    { id: 25, city: 'Bratislava - Karlova Ves', name: 'Cintorín Slávičie údolie' },
    { id: 26, city: 'Bratislava - Lamač', name: 'Cintorín Lamač' },
    { id: 27, city: 'Bratislava - Lamač', name: 'Krematórium Bratislava' },
    { id: 28, city: 'Bratislava - Petržalka', name: 'Cintorín Petržalka' },
    { id: 29, city: 'Bratislava - Podunajské Biskupice', name: 'Cintorín Komárov' },
    { id: 30, city: 'Bratislava - Podunajské Biskupice', name: 'Cintorín Podunajské Biskupice' },
    { id: 31, city: 'Bratislava - Rača', name: 'Cintorín Rača' },
    { id: 32, city: 'Bratislava - Rusovce', name: 'Cintorín Rusovce' },
    { id: 33, city: 'Bratislava - Ružinov', name: 'Cintorín Prievoz' },
    { id: 34, city: 'Bratislava - Ružinov', name: 'Martinský cintorín' },
    { id: 35, city: 'Bratislava - Staré Mesto', name: 'Cintorín Kozia brána' },
    { id: 36, city: 'Bratislava - Staré Mesto', name: 'Mikulášsky cintorín' },
    { id: 37, city: 'Bratislava - Staré Mesto', name: 'Neologický cintorín' },
    { id: 38, city: 'Bratislava - Staré Mesto', name: 'Ondrejský cintorín' },
    { id: 39, city: 'Bratislava - Vajnory', name: 'Cintorín Vajnory' },
    { id: 40, city: 'Bratislava - Vrakuňa', name: 'Cintorín Stará Vrakuňa' },
    { id: 41, city: 'Bratislava - Vrakuňa', name: 'Cintorín Vrakuňa (Ružinov)' },
    { id: 42, city: 'Bratislava - Záhorská Bystrica', name: 'Záhorská Bystrica' },
    { id: 43, city: 'Bratislava - Čunovo', name: 'Cintorín Čunovo' },
    { id: 44, city: 'Brekov', name: 'Brekov' },
    { id: 45, city: 'Bretka', name: 'Bretka' },
    { id: 46, city: 'Budimír', name: 'Nový cintorín' },
    { id: 47, city: 'Budimír', name: 'Starý cintorín' },
    { id: 48, city: 'Budmerice', name: 'Budmerice' },
    { id: 49, city: 'Bukovec okr. Košice', name: 'Bukovec' },
    { id: 50, city: 'Bukovec okr. Myjava', name: 'Cintorín Bukovec' },
    { id: 51, city: 'Buková', name: 'Buková' },
    { id: 52, city: 'Buzica', name: 'Cintorín Buzica' },
    { id: 53, city: 'Bystrany', name: 'Cintorín Bystrany' },
    { id: 54, city: 'Bystrička', name: 'Bystrička' },
    { id: 55, city: 'Bziny', name: 'Cintorín Bziny' },
    { id: 56, city: 'Báhoň', name: 'Nový cintorín' },
    { id: 57, city: 'Báhoň', name: 'Starý cintorín' },
    { id: 58, city: 'Báč', name: 'Nový cintorín' },
    { id: 59, city: 'Cerová', name: 'Cerová' },
    { id: 60, city: 'Cerová', name: 'Cerová - Lieskové' },
    // Prípadne môžete pokračovať s ďalšími mestami a cintorínmi
  ]);
  

  // Function to get services by podnikatelId
  const getServicesByEntrepreneurId = (entrepreneurId) => {
    return services.filter(service => service.entrepreneurId === entrepreneurId);
  };

  const addService = (newService) => {
    setServices(prevServices => [...prevServices, newService]);
    // Tu môžete pridať API volanie na pridanie služby do backendu
  };

  // Upravovanie služby
  const editService = (updatedService) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === updatedService.id ? updatedService : service
      )
    );
    // Tu môžete pridať API volanie na úpravu služby v backendu
  };

  // Vymazanie služby
  const deleteService = (id) => {
    setServices(prevServices => prevServices.filter(service => service.id !== id));
    // Tu môžete pridať API volanie na vymazanie služby z backendu
  };

  return (
    <ServiceContext.Provider value={{ services, cemeteriesData, setServices, getServicesByEntrepreneurId, addService, editService, deleteService }}>
      {children}
    </ServiceContext.Provider>
  );
};

// Custom hook to use the ServiceContext
export const useService = () => useContext(ServiceContext);