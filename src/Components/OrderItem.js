import React, { useState } from 'react';
import OrderDetailsModal from '../Modals/OrderDetailsModal';

const OrderItem = ({ order }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* Order item row */}
      <div className="flex justify-between items-center bg-customPurpleNavbar rounded-[50px] p-2 mb-2">
        <span className="w-1/2 text-black bg-white p-1 px-4 rounded-3xl">{order.customerName}</span>
        <span className="w-3/4 text-black bg-white p-1 px-4 rounded-3xl">{order.address}</span>
        <span className="w-1/3 text-black bg-white p-1 px-4 rounded-3xl">{order.deadline}</span>
        <button className="w-1/6 flex justify-center" onClick={openModal}>
          <img src="/images/detaily.png" alt="Details" className="w-8 h-8 mx-2" />
        </button>
      </div>

      {/* Modal for order details */}
      {isModalOpen && <OrderDetailsModal order={order} onClose={closeModal} />}
    </>
  );
};

export default OrderItem;
