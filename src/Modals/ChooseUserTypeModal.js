import React, { useState } from 'react';
import EntrepreneurRegistration from './EntrepreneurRegistration';

const ChooseUserTypeModal = ({ isOpen, onClose, userData }) => {
  const [isEntrepreneurModalOpen, setIsEntrepreneurModalOpen] = useState(false);

  const handleChooseEntrepreneur = () => {
    setIsEntrepreneurModalOpen(true); // Otvorí modal pre registráciu podnikateľa
  };

  if (!isOpen && !isEntrepreneurModalOpen) return null;

  return (
    <>
      {isOpen && !isEntrepreneurModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl relative">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
              ✕
            </button>
            <div className="bg-purple-200 p-3 mb-6 rounded-full flex justify-center">
              <h2 className="text-3xl font-bold text-center text-black">
                Chceš sa stať našim poskytovateľom?
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center w-1/2">
                <h3 className="text-4xl font-bold mb-4">NIE</h3>
                <button
                  className="bg-purple-200 text-black py-4 px-8 rounded-full text-lg font-semibold w-60"
                  onClick={onClose}
                >
                  Pokračovať na domovskú obrazovku
                </button>
              </div>
              <div className="border-l-2 h-24 mx-5"></div> {/* Vertikálna čiara medzi sekciami */}
              <div className="flex flex-col items-center w-1/2">
                <h3 className="text-4xl font-bold mb-4">ÁNO</h3>
                <button
                  className="bg-purple-600 text-white py-4 px-8 rounded-full text-lg font-semibold w-60"
                  onClick={handleChooseEntrepreneur}
                >
                  Pokračovať v registrácii
                </button>
              </div>
            </div>
            <div className="text-center mt-8 text-xs">
              <p>
                Kliknutím na Zaregistrovať súhlasíš so&nbsp;
                <a href="#" className="text-purple-600">Zmluvnými podmienkami</a> spoločnosti Gravecare, našimi&nbsp;
                <a href="#" className="text-purple-600">Zásadami ochrany osobných údajov</a> a&nbsp;
                <a href="#" className="text-purple-600">Oznámením o práve na stiahnutie EÚ, EHS/UK.</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Otvorenie modalu pre registráciu podnikateľa */}
      {isEntrepreneurModalOpen && (
        <EntrepreneurRegistration
          isOpen={isEntrepreneurModalOpen}
          onClose={onClose}
          personalData={userData}  // Posielame údaje používateľa ďalej
        />
      )}
    </>
  );
};

export default ChooseUserTypeModal;
