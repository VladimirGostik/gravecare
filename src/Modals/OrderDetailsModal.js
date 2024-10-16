import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import calendar
import 'react-calendar/dist/Calendar.css'; // Calendar styles

const OrderDetailsModal = ({ order, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(''); // State for selected date
  const [showDateModal, setShowDateModal] = useState(false); // State for showing calendar modal
  const deadline = new Date(order.deadline); // Convert deadline to Date object

  // Open the calendar modal
  const handleDateClick = () => {
    setShowDateModal(true);
  };

  // Close the calendar modal
  const handleDateModalClose = () => {
    setShowDateModal(false);
  };

  // Select a date from the calendar
  const handleDateSelect = (date) => {
    setSelectedDate(date.toLocaleDateString('en-US'));
    handleDateModalClose(); // Close the modal
  };

  // Disable dates before today or after the deadline
  const isDateDisabled = (date) => {
    const today = new Date();
    return date < today || date > deadline;
  };

  // Apply a red background for disabled dates
  const tileClassName = ({ date, view }) => {
    const today = new Date();
    if (date < today || date > deadline) {
      return 'disabled-date'; // This class will be applied for disabled dates
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 backdrop-filter backdrop-blur-sm bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-3 rounded-[30px] shadow-sm w-full max-w-3xl relative">
        <button onClick={onClose} className="absolute top-3 right-5 text-gray-600">
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Detail objednávky č. {order.id}</h2>

        <div className="flex justify-between">
          {/* Left side with order details */}
          <div className="bg-backroundPurple p-3 rounded-2xl w-[65%]">
            <p className="mx-2"><strong>Meno zákazníka:</strong></p>
            <div className="bg-customSideBar rounded-xl w-full p-1 px-2">{order.customerName}</div>
            <p className="mx-2 mt-2"><strong>Adresa:</strong></p>
            <div className="bg-customSideBar rounded-xl w-full p-1 px-2">{order.address}</div>
            <p className="mx-2 mt-2"><strong>Detailný popis:</strong></p>
            <div className="bg-customSideBar rounded-xl w-full p-1 px-2">{order.description}</div>
            <p className="mx-2 mt-2"><strong>Vybrané služby:</strong></p>
            <div className="bg-customSideBar rounded-xl w-full p-2">
              <ul className="list-disc pl-5">
                {order.selectedServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
              <p className="font-bold text-lg mt-4">Celkom: {order.totalPrice}</p>
            </div>
          </div>

          {/* Right side with image and date selection */}
          <div className="w-[33%] flex flex-col items-center">
            <p className="mb-2">Fotka pridaná používateľom:</p>
            <div className="flex justify-center mb-3">
              {order.beforeImage ? (
                <img src={order.beforeImage} alt="Fotka pred" className="rounded-lg shadow-lg" />
              ) : (
                <div className="text-center border-[3px] p-6 rounded-2xl">
                  <img src="/images/gallery.png" alt="Žiadna fotka" className="w-20 h-20 mx-auto" />
                  <p className="text-gray-500">Nebola pridaná žiadna fotka</p>
                </div>
              )}
            </div>

            <div className="mt-2 bg-customSideBar p-2 rounded-xl w-full shadow-lg">
              <label className="block text-lg font-bold mb-2 text-center text-gray-700">Dátum vykonávania:</label>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={selectedDate}
                  placeholder="mm/dd/yyyy"
                  onClick={handleDateClick}
                  className="w-[80%] px-3 py-2 border-[2px] border-black rounded-lg shadow-sm text-center text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Date selection modal */}
        {showDateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Vyberte dátum:</h3>
              <Calendar
                onChange={handleDateSelect}
                value={new Date()}
                tileDisabled={({ date }) => isDateDisabled(date)} // Disable unavailable dates
                tileClassName={tileClassName} // Apply custom class to disabled dates
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleDateModalClose}
                  className="bg-red-500 text-white px-4 py-2 rounded-2xl"
                >
                  Zrušiť
                </button>
                <button
                  onClick={() => handleDateSelect(selectedDate)}
                  className="bg-green-500 text-white px-4 py-2 rounded-2xl"
                >
                  Potvrdiť
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm and cancel buttons */}
        <div className="flex justify-center mt-6 space-x-6">
          <button className="bg-green-500 text-white px-8 py-2 rounded-xl text-lg hover:bg-green-700">Prijať</button>
          <button className="bg-red-500 text-white px-8 py-2 rounded-xl text-lg hover:bg-red-700">Zrušiť</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
