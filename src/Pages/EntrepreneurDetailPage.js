import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Pridaný useNavigate
import { useEntrepreneurs } from '../Context/EntrepreneurContext';
import { useService } from '../Context/ServiceContext';
import { useOrders } from '../Context/OrderContext';
import UserLayout from '../Layouts/UserLayout';
import CompanyInfo from '../Components/CompanyInfo';
import CompanyDescription from '../Components/CompanyDescription';
import ServiceOverview from '../Components/ServiceOverview';
import CompletedOrdersPortfolio from '../Components/CompletedOrdersPortfolio';
import OrderModal from '../Components/User/OrderModal';

const EntrepreneurDetailPage = () => {
  const { id } = useParams();
  const { entrepreneurs } = useEntrepreneurs();
  const { getServicesByEntrepreneurId } = useService();
  const { fetchCompletedOrdersByEntrepreneurId } = useOrders();
  const navigate = useNavigate(); // Pridaný useNavigate

  const [services, setServices] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const entrepreneur = entrepreneurs.find((e) => e.id === parseInt(id));

  useEffect(() => {
    if (entrepreneur) {
      const fetchedServices = getServicesByEntrepreneurId(entrepreneur.id);
      setServices(fetchedServices);

      const fetchOrders = async () => {
        const orders = await fetchCompletedOrdersByEntrepreneurId(entrepreneur.id);
        setCompletedOrders(orders);
      };
      fetchOrders();
    }
  }, [entrepreneur, getServicesByEntrepreneurId, fetchCompletedOrdersByEntrepreneurId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!entrepreneur) {
    return (
      <div className="min-h-screen w-[90%] bg-backgroundPurple mx-auto rounded-[50px] p-4 mt-4">
        <h1 className="text-5xl font-bold text-white">Podnikateľ neexistuje.</h1>
      </div>
    );
  }

  const companyData = {
    companyLogo: entrepreneur.companyLogo,
    companyName: entrepreneur.companyName,
    averageRating: entrepreneur.averageRating,
    description: entrepreneur.description,
  };

  const personalData = {
    email: entrepreneur.email || 'N/A',
    phoneNumber: entrepreneur.phoneNumber || 'N/A',
  };

  const handleOrderButtonClick = () => {
    setIsOrderModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsOrderModalOpen(false);
  };

  // Funkcia na navigáciu späť
  const handleGoBack = () => {
    navigate(-1); // Vráti sa na predchádzajúcu stránku
  };

  return (
    <UserLayout>
      <div className="min-h-screen w-[90%] bg-backroundPurple mx-auto rounded-[50px] p-8 mt-4">
        {/* Tlačidlo Späť */}
        <div>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={handleGoBack}
          >
            Späť
          </button>
        </div>

        {/* Sekcia informácií o spoločnosti */}
        <div className="flex flex-col md:flex-row md:space-x-8 items-center md:items-start">
          <div className="w-full md:w-1/2">
            <CompanyInfo companyData={companyData} />
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <CompanyDescription personalData={personalData} />
          </div>
        </div>

        {/* Popis spoločnosti */}
        <div className="bg-customPurpleNavbar text-white p-6 rounded-2xl mt-2">
          <h2 className="text-2xl font-bold mb-4">O spoločnosti</h2>
          <p className="whitespace-normal break-words text-justify">
            {companyData.description || 'Žiadny popis nie je k dispozícii.'}
          </p>
        </div>

        {/* Tlačidlo na objednanie služby */}
        <div className="flex justify-center mt-2">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
            onClick={handleOrderButtonClick}
          >
            Objednať službu
          </button>
        </div>

        {/* Ponuka služieb */}
        <div className="mt-2">
          <h2 className="text-3xl font-bold text-white mb-2">Ponuka služieb</h2>
          <ServiceOverview services={services} />
        </div>

        {/* Portfólio prác */}
        <div className="mt-2">
          <h2 className="text-3xl font-bold text-white mb-2">Portfólio prác</h2>
          <CompletedOrdersPortfolio completedOrders={completedOrders} />
        </div>
      </div>

      {/* Objednávkový modál */}
      {isOrderModalOpen && (
        <OrderModal
          entrepreneur={entrepreneur}
          services={services}
          onClose={handleCloseModal}
        />
      )}
    </UserLayout>
  );
};

export default EntrepreneurDetailPage;
