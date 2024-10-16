import React from 'react';

const TableItem = ({ order, onOrderClick }) => {
  return (
    <div className="flex justify-between items-center bg-customPurpleNavbar rounded-[50px] p-2 mb-2 shadow-lg">
      <div className="w-1/3 bg-white text-black font-medium text-sm p-1 px-4 rounded-3xl text-left">
        {order.entrepreneurName}
      </div>
      <div className="w-1/2 bg-white text-black font-medium text-sm p-1 px-4 rounded-3xl text-left">
        {order.cemeteryName}
      </div>
      <div className="w-1/6 bg-white text-black font-medium text-sm p-1 px-4 rounded-3xl text-left">
        {order.deadline}
      </div>
      <div className="w-1/6 bg-white flex justify-center items-center p-1 px-4 rounded-3xl text-center  hover:bg-gray-300 transition-all">
        <button
          onClick={() => onOrderClick(order)}
          className="text-black font-medium text-sm  rounded-3xl"
        >
          Zobraziť
        </button>
      </div>
    </div>
  );
};

export default TableItem;
