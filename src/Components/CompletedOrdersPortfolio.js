// CompletedOrdersPortfolio.js
import React, { useEffect, useState } from 'react';
import PortfolioOrderItem from './PortfolioOrderItem';

const CompletedOrdersPortfolio = ({ completedOrders }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (completedOrders) {
      setIsLoaded(true);
    }
  }, [completedOrders]);

  return (
    <div
      className={`mt-8 w-full max-w-3xl mx-auto transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h2 className="text-2xl text-white font-bold mb-4">Dokončené objednávky:</h2>
      {completedOrders && completedOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedOrders.map((order) => (
            <PortfolioOrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-white">Žiadne dokončené objednávky nie sú k dispozícii.</p>
      )}
    </div>
  );
};

export default CompletedOrdersPortfolio;
