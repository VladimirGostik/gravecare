import React, { useState } from 'react';
import moment from 'moment';  // For date manipulation
import OrderDetailsWithImagesModal from '../Modals/OrderDetailsWithImagesModal'; // Import modalu

const WeeklyView = ({ orders }) => {
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [selectedOrder, setSelectedOrder] = useState(null); // Stav pre vybranú objednávku

  const startOfWeek = currentWeek.clone().startOf('week');
  const weekDays = Array(7).fill(0).map((_, index) => startOfWeek.clone().add(index, 'days'));

  const getOrdersForDay = (date) => {
    return orders.filter(order => moment(order.deadline).isSame(date, 'day'));
  };

  // Funkcia na prechod na predchádzajúci týždeň
  const goToPreviousWeek = () => {
    setCurrentWeek(prev => prev.clone().subtract(1, 'week'));
  };

  // Funkcia na prechod na ďalší týždeň
  const goToNextWeek = () => {
    setCurrentWeek(prev => prev.clone().add(1, 'week'));
  };

  // Otvorenie modalu s detailmi objednávky
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
  };

  // Zatvorenie modalu
  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="flex flex-col w-full mx-auto">
      {/* Prepínač týždňov */}
      <div className="flex justify-center items-center mb-4">
        <button 
          className="text-white bg-purple-500 px-4 py-2 rounded-l-full" 
          onClick={goToPreviousWeek}
        >
          &lt; Predchádzajúci týždeň
        </button>
        <div className="text-center mx-4">
          <span className="font-bold text-white">
            {startOfWeek.format('DD.MM')} - {startOfWeek.clone().endOf('week').format('DD.MM.YYYY')}
          </span>
        </div>
        <button 
          className="text-white bg-purple-500 px-4 py-2 rounded-r-full" 
          onClick={goToNextWeek}
        >
          Nasledujúci týždeň &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 w-full">
        {weekDays.map((day) => (
          <div key={day.format('DD-MM-YYYY')} className="bg-gray-200 rounded-3xl  text-center flex flex-col justify-between">
            {/* Názov dňa a dátum v čiernom divku s bielym textom */}
            <div className="bg-black text-white rounded-t-3xl">
              <p className="font-bold mt-1">{day.format('dddd')}</p>
              <p>{day.format('D.M')}</p>
            </div>

            <div className="mt-2 flex-grow flex flex-col">
              {getOrdersForDay(day).length > 0 ? (
                getOrdersForDay(day).map((order, idx) => (
                  <div key={idx} className="flex flex-col justify-between bg-white rounded-3xl p-2 text-sm mb-4 shadow-lg ml-1 mr-1">
                    <p>{order.address}</p>
                    <hr className="my-2" />
                    <button
                      className="bg-black text-white px-4 py-2 rounded-full font-bold"
                      onClick={() => handleOpenModal(order)}
                    >
                      Detail
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Žiadne objednávky</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal pre detaily objednávky */}
      {selectedOrder && (
        <OrderDetailsWithImagesModal 
          order={selectedOrder}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default WeeklyView;
