// Modal.js

import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm transition-opacity duration-700 ease-in-out">
      <div className="bg-white rounded-[40px] shadow-lg w-full max-w-3xl mx-2 relative">
        {/* Tlačidlo na zatvorenie */}
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 text-3xl"
          onClick={onClose}
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
