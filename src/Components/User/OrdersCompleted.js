import React, { useEffect, useState } from 'react';
import { useOrders } from '../../Context/OrderContext'; // Importujeme OrderContext
import TableComponentDone from './TableComponentDone';
import OrderCompletedUser from '../../Modals/OrderCompletedUser'; // Import modalu
import { useAuth } from '../../Context/AuthContext'; // Importujeme AuthContext

const OrdersCompleted = () => {
  const { fetchByCustomerCompletedId } = useOrders();  // Použijeme funkciu na získanie nevybavených objednávok
  const [waitingOrders, setWaitingOrders] = useState([]);
  const { user } = useAuth(); // Získavame údaje o používateľovi
  const [selectedOrder, setSelectedOrder] = useState(null); // Stav pre vybranú objednávku

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.id) {
        try {
          const orders = await fetchByCustomerCompletedId(user.id); // Získavame nevybavené objednávky pre daného používateľa
          setWaitingOrders(orders);
        } catch (error) {
          console.error('Error fetching pending orders:', error);
        }
      }
    };

    fetchOrders();
  }, [fetchByCustomerCompletedId, user]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order); // Nastavíme vybranú objednávku, ktorú chceme zobraziť v modáli
  };

  const handleCloseModal = () => {
    setSelectedOrder(null); // Zavrieme modál nastavením vybranej objednávky na `null`
  };

  return (
    <>
      <div className="text-left mb-4 ml-4">
        <h2 className="text-2xl font-bold text-white">Objednávky čakajúce na ohodnotenie:</h2>
      </div>
      <TableComponentDone orders={waitingOrders} onOrderClick={handleOrderClick} />
      {selectedOrder && (
        <OrderCompletedUser order={selectedOrder} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default OrdersCompleted;
