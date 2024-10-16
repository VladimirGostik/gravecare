import React, { useState } from 'react';
import OrderDetailsWithImagesModal from '../Modals/OrderDetailsWithImagesModal'; // Import modalu

const PendingOrdersItem = ({ order }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex justify-between items-center bg-customPurpleNavbar rounded-[50px] p-2 mb-2">
            <span className="w-1/6 text-black bg-white p-1 px-4 rounded-3xl">č. {order.id}</span>
            <span className="w-1/2 text-black bg-white p-1 px-4 rounded-3xl">{order.customerName}</span>
            <span className="w-3/4 text-black bg-white p-1 px-4 rounded-3xl">{order.address}</span>
            <span className="w-1/3 text-black bg-white p-1 px-4 rounded-3xl">{order.deadline}</span>
            <button className="w-1/6 flex justify-center" onClick={handleOpenModal}>
                <img src="/images/detaily.png" alt="Details" className="w-8 h-8 mx-2" />
            </button>
            {isModalOpen && (
                <OrderDetailsWithImagesModal order={order} onClose={handleCloseModal} />
            )}
        </div>
    );
};
export default PendingOrdersItem;