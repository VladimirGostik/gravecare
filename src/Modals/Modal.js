import React, { useState, useEffect } from 'react';

const Modal = ({ title, setIsOpen, children }) => {
  const [showModal, setShowModal] = useState(false); // Stav pre plynulý prechod

  useEffect(() => {
    if (setIsOpen) {
      setTimeout(() => setShowModal(true), 0); // Krátke oneskorenie pre plynulý prechod
    } else {
      setShowModal(false); // Zatvorenie modalu po animácii
    }
  }, [setIsOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm transition-opacity duration-700 ease-in-out p-4 ${
        setIsOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white p-5 rounded-[30px] shadow-lg w-full max-w-md relative transition-transform duration-300 ease-in-out ${
          showModal ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        <div className="bg-purple-200 p-3 mb-2 rounded-full flex justify-center">
          <h2 className="text-2xl font-bold ">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
