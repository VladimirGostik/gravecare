import React, { useState, useEffect } from 'react';
import { useEntrepreneurs } from '../Context/EntrepreneurContext';
import { useService } from '../Context/ServiceContext';
import UserLayout from '../Layouts/UserLayout';
import FilterComponent from '../Components/User/FilterComponent';
import EntrepreneurCard from '../Components/User/EntrepreneurCard';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth } from '../Context/AuthContext';
import ReviewModal from '../Modals/ReviewModal';
import { useOrders } from '../Context/OrderContext';

const UserDashboard = () => {
  const { filterEntrepreneurs, entrepreneurs } = useEntrepreneurs();
  const { cemeteriesData, services } = useService();
  const { user, pendingReviewOrder, setPendingReviewOrder } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orderContext = useOrders();
  const { fetchByCustomerNotreviewedId, updateOrderReview } = orderContext || {};

  const location = useLocation();
  const navigate = useNavigate();

  const parsed = queryString.parse(location.search);

  const [filterName, setFilterName] = useState(() => {
    try {
      return parsed.filterName ? JSON.parse(parsed.filterName) : [];
    } catch (e) {
      return [];
    }
  });

  const [filterService, setFilterService] = useState(() => {
    try {
      return parsed.filterService ? JSON.parse(parsed.filterService) : [];
    } catch (e) {
      return [];
    }
  });

  const [filterCemetery, setFilterCemetery] = useState(() => parsed.filterCemetery ? parsed.filterCemetery : '');
  const [sortField, setSortField] = useState(() => parsed.sortField || 'rating');
  const [sortDirection, setSortDirection] = useState(() => parsed.sortDirection || 'asc');

  // Fetch not reviewed orders when user logs in
  useEffect(() => {
    if (user && user.role === 'user') {
      const fetchOrders = async () => {
        try {
          const notReviewedOrders = await fetchByCustomerNotreviewedId(user.id);
          if (notReviewedOrders && notReviewedOrders.length > 0) {
            setPendingReviewOrder(notReviewedOrders[0]);
          }
        } catch (error) {
          console.error('Chyba pri získavaní objednávok na recenziu:', error);
        }
      };
      fetchOrders();
    }
  }, [user, fetchByCustomerNotreviewedId, setPendingReviewOrder]);

  // Open modal if there is a pending review order
  useEffect(() => {
    if (pendingReviewOrder) {
      setIsModalOpen(true);
    }
  }, [pendingReviewOrder]);

  const handleSubmitReview = async (review) => {
    try {
      await updateOrderReview(pendingReviewOrder.id, review);
      setIsModalOpen(false);
      setPendingReviewOrder(null);
    } catch (error) {
      console.error('Chyba pri odosielaní recenzie:', error);
    }
  };

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
    setPendingReviewOrder(null);
  };

  // Príprava podnikateľov pre multi-select
  const entrepreneurOptions = entrepreneurs.map(entrepreneur => ({
    value: entrepreneur.id,
    label: entrepreneur.companyName
  }));

  // Príprava služieb pre multi-select
  const serviceOptions = services.map(service => ({
    value: service.name,
    label: service.name
  }));

  const filteredEntrepreneurs = filterEntrepreneurs(filterName, filterService, filterCemetery);

  // Triedenie
  const sortedEntrepreneurs = [...filteredEntrepreneurs].sort((a, b) => {
    if (sortField === 'name') {
      const nameA = a.companyName.toLowerCase();
      const nameB = b.companyName.toLowerCase();
      return sortDirection === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else if (sortField === 'rating') {
      return sortDirection === 'asc' ? a.averageRating - b.averageRating : b.averageRating - a.averageRating;
    }
    return 0;
  });

  // Synchronizácia filtrov s URL
  useEffect(() => {
    const newQuery = {
      filterName: JSON.stringify(filterName),
      filterService: JSON.stringify(filterService),
      filterCemetery: filterCemetery,
      sortField,
      sortDirection,
    };
    const currentQuery = queryString.stringify(parsed);
    const updatedQuery = queryString.stringify(newQuery);
    if (currentQuery !== updatedQuery) {
      navigate({
        pathname: location.pathname,
        search: updatedQuery,
      }, { replace: true });
    }
  }, [filterName, filterService, filterCemetery, sortField, sortDirection]);

  return (
    <div>
      <UserLayout />
      <div className='min-h-screen w-[90%] bg-backroundPurple mx-auto rounded-[50px] p-4 mt-4'>
        {/* Filter component */}
        <FilterComponent
          filterName={filterName}
          setFilterName={setFilterName}
          filterService={filterService}
          setFilterService={setFilterService}
          filterCemetery={filterCemetery}
          setFilterCemetery={setFilterCemetery}
          cemeteriesData={cemeteriesData}
          entrepreneurOptions={entrepreneurOptions}
          serviceOptions={serviceOptions}
        />

        {/* Triedenie */}
        <div className="flex justify-end items-center mb-4">
          <label className="text-white text-lg mr-2">Zoradiť podľa:</label>
          <div className="flex items-center space-x-2">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="p-2 bg-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-500"
            >
              <option value="rating">Hodnotenie</option>
              <option value="name">Názov spoločnosti</option>
            </select>

            <button
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="flex items-center p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              {sortDirection === 'asc' ? (
                <FaSortUp className="text-purple-500" />
              ) : (
                <FaSortDown className="text-purple-500" />
              )}
              <span className="ml-1 text-gray-700">
                {sortDirection === 'asc' ? 'Vzostupne' : 'Zostupne'}
              </span>
            </button>
          </div>
        </div>

        {/* Zobrazenie podnikateľov */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedEntrepreneurs.length > 0 ? (
            sortedEntrepreneurs.map((entrepreneur) => (
              <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
            ))
          ) : (
            <p className="text-white">Žiadni podnikatelia sa nenašli.</p>
          )}
        </div>
      </div>

      {/* Modal pre recenziu */}
      {isModalOpen && (
        <ReviewModal
          order={pendingReviewOrder}
          onSubmitReview={handleSubmitReview}
          onClose={handleCloseReviewModal}
        />
      )}
    </div>
  );
};

export default UserDashboard;