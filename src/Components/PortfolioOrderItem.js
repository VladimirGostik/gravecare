import React, { useState } from 'react';
import StarRating from './StarRating';

const PortfolioOrderItem = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funkcie na otvorenie a zatvorenie modálu
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sk-SK', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      {/* Karta zobrazujúca zhrnutie objednávky */}
      <div
        className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col transition-all duration-500 hover:shadow-lg cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="flex -mx-2 overflow-hidden">
          <div className="w-1/2 px-2 flex justify-center">
            <img
              src={order.beforeImage}
              alt="Before"
              className="w-32 h-auto object-cover rounded"
            />
          </div>
          <div className="w-1/2 px-2 flex justify-center">
            <img
              src={order.afterImage}
              alt="After"
              className="w-32 h-auto object-cover rounded"
            />
          </div>
        </div>
        <div className="mt-2 flex-grow">
          <h3 className="font-bold text-xs">Hodnotenie:</h3>
          <StarRating rating={order.rating} />
        </div>
        <div className="mt-2">
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-center text-sm break-words line-clamp-2 hover:line-clamp-none transition-all duration-300">
              {order.written_review}
            </p>
          </div>
        </div>
      </div>

      {/* Modal zobrazujúci detail objednávky */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black z-50 backdrop-filter backdrop-blur-sm bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-2 rounded-[20px] shadow-sm w-full max-w-2xl relative">
            {/* Tlačidlo na zatvorenie */}
            <button onClick={handleCloseModal} className="absolute top-2 right-4 text-gray-600">
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-3 text-center">Detail objednávky</h2>

            <div className="flex justify-between">
              {/* Ľavá strana - Obrázky a recenzia */}
              <div className="w-[58%] flex flex-col items-center p-2 rounded-2xl">
                <div className="flex justify-between w-full">
                  {/* Fotka pred */}
                  <div className="w-[45%]">
                    <label className="block mb-1 text-lg font-bold">Fotka pred:</label>
                    <div className="flex justify-center mb-2">
                      {order.beforeImage ? (
                        <img src={order.beforeImage} alt="Fotka pred" className="w-30 h-auto rounded-lg shadow-lg" />
                      ) : (
                        <div className="text-center border-[3px] p-4 rounded-2xl">
                          <img src="/images/gallery.png" alt="Žiadna fotka" className="w-16 h-16 mx-auto" />
                          <p className="text-gray-500">Nebola pridaná žiadna fotka</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Fotka po */}
                  <div className="w-[45%]">
                    <label className="block mb-1 text-lg font-bold">Fotka po:</label>
                    <div className="flex justify-center mb-2">
                      {order.afterImage ? (
                        <img src={order.afterImage} alt="Fotka po" className="w-30 h-auto rounded-lg shadow-lg" />
                      ) : (
                        <div className="text-center border-[3px] p-4 rounded-2xl">
                          <img src="/images/gallery.png" alt="Žiadna fotka" className="w-16 h-16 mx-auto" />
                          <p className="text-gray-500">Nebola pridaná žiadna fotka</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pravá strana - Detail objednávky */}
              <div className="bg-backroundPurple p-2 rounded-2xl w-[40%]">
                <p className="mb-1 text-white text-center"><strong>Ponúkané služby:</strong></p>
                <div className="bg-customSideBar rounded-xl w-full p-1">
                  <ul className="list-disc pl-4">
                    {order.selectedServices && order.selectedServices.length > 0 ? (
                      order.selectedServices.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))
                    ) : (
                      <p>Žiadne služby neboli vybrané.</p>
                    )}
                  </ul>
                  <p className="font-bold text-lg mt-3">Celkom: {order.totalPrice}</p>
                </div>
                <div className="mt-2">
                  <p className="text-white text-center"><strong>Hodnotenie:</strong></p>
                  <div className="flex justify-center mt-1">
                    <StarRating rating={order.rating} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recenzia na celú šírku */}
            <div className="w-full mt-3">
              <p className="text-left ml-4"><strong>Recenzia:</strong></p>
              <div className="bg-customSideBar rounded-xl p-3 text-left">
                {order.written_review ? order.written_review : 'Žiadne hodnotenie zatiaľ.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioOrderItem;
