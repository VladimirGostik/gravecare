// PortfolioSettings.js
import React, { useState, useEffect } from 'react';
import BusinessLayout from '../Layouts/BusinessLayout';
import ProfileTabNavigation from '../Components/ProfileTabNavigation';
import CompanyInfo from '../Components/CompanyInfo';
import CompanyDescription from '../Components/CompanyDescription';
import { useAuth } from '../Context/AuthContext';
import { useService } from '../Context/ServiceContext';
import { useOrders } from '../Context/OrderContext';
import ServiceOverview from '../Components/ServiceOverview';
import CompletedOrdersPortfolio from '../Components/CompletedOrdersPortfolio';

const PortfolioSettings = () => {
  const { companyData, personalData } = useAuth();
  const { getServicesByEntrepreneurId } = useService();
  const { fetchCompletedOrders } = useOrders();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    companyData?.description || ''
  );
  const [entrepreneurServices, setEntrepreneurServices] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    if (personalData?.id) {
      const services = getServicesByEntrepreneurId(personalData.id);
      console.log('Fetched services:', services);
      setEntrepreneurServices(services);

      // Načítanie dokončených objednávok
      const fetchOrders = async () => {
        try {
          const orders = await fetchCompletedOrders(personalData.id);
          setCompletedOrders(orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      fetchOrders();
    } else {
      console.log('No personal data found or no ID available.');
    }
  }, [
    personalData,
    getServicesByEntrepreneurId,
    fetchCompletedOrders,
  ]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      console.log('Saved description:', description);
      // Tu môžete pridať funkciu na uloženie popisu
    }
    setIsEditing(!isEditing);
  };

  return (
    <BusinessLayout>
      <ProfileTabNavigation />
      <div className="min-h-screen w-full bg-backroundPurple mt-2 rounded-[50px] overflow-x-hidden">
        {/* Prvý riadok s flex */}
        <div className="flex flex-wrap justify-center space-x-4 m-4">
          <div className="w-full md:w-2/5 mt-2">
            <CompanyInfo
              personalData={personalData}
              companyData={companyData}
            />
          </div>

          <div className="w-full md:w-2/5 mt-2">
            <CompanyDescription personalData={personalData} />
          </div>
        </div>

        {/* Detail podnikateľa */}
        <div className="mt-8 flex flex-col items-center">
          <h1 className="text-white text-2xl font-bold">
            Detail podnikateľa:
          </h1>

          {/* Popis s možnosťou úpravy */}
          <div className="bg-customPurpleNavbar text-white p-4 rounded-2xl max-w-3xl mt-4 w-full md:w-auto">
            {isEditing ? (
              <textarea
                className="w-full p-2 rounded-lg bg-white text-black"
                value={description}
                onChange={handleDescriptionChange}
                rows="4"
              />
            ) : (
              <p className="whitespace-normal break-words text-center">
                {description || 'Žiadny popis nie je k dispozícii.'}
              </p>
            )}
          </div>

          {/* Tlačidlo Upraviť/Uložiť */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-purple-500 text-white p-2 rounded-lg"
              onClick={handleToggleEdit}
            >
              {isEditing ? 'Uložiť zmeny' : 'Upraviť'}
            </button>
          </div>
        </div>

        {/* Ponuka služieb */}
        <div className="m-5">
          <ServiceOverview services={entrepreneurServices} />
        </div>
        <div className="m-5">
          <CompletedOrdersPortfolio
            completedOrders={completedOrders}
          />
        </div>
      </div>
    </BusinessLayout>
  );
};

export default PortfolioSettings;
