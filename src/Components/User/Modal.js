// Modal.js

import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 relative">
        {/* Tlačidlo na zatvorenie */}
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-700"
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
