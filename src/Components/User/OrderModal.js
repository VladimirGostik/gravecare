import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal'; // Presuming you have a Modal component
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useService } from '../../Context/ServiceContext'; // Import useService for cemeteriesData

const OrderModal = ({ entrepreneur, services, onClose }) => {
  const { cemeteriesData } = useService();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 - State
  const [selectedCemetery, setSelectedCemetery] = useState('');
  const [orderDescription, setOrderDescription] = useState('');
  const [beforeImage, setBeforeImage] = useState(null);
  const [beforeImageName, setBeforeImageName] = useState('');
  const beforeImageInputRef = useRef(null);
  const [deadline, setDeadline] = useState(new Date());
  const [showAllServices, setShowAllServices] = useState(false);

  // Step 2 - State
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Update total price when selected services change
  useEffect(() => {
    const total = selectedServices.reduce((sum, s) => {
      const priceNumber = parseFloat(s.price.replace(/[^0-9.]/g, ''));
      return sum + priceNumber;
    }, 0);
    setTotalPrice(total);
  }, [selectedServices]);

  // Functions to handle steps
  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validation for step 1 (optional)
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    // Implement order creation logic here
    const orderData = {
      entrepreneurId: entrepreneur.id,
      cemeteryId: selectedCemetery,
      orderDescription,
      uploadedPhoto: beforeImage,
      selectedServices: selectedServices.map((s) => s.id),
      totalPrice,
      deadline,
      customerName,
      customerAddress,
      customerEmail,
      customerPhone,
    };
    console.log('Order created:', orderData);
    onClose();
  };

  const handleServiceSelection = (service) => {
    const isSelected = selectedServices.includes(service);
    let updatedServices;
    if (isSelected) {
      updatedServices = selectedServices.filter((s) => s !== service);
    } else {
      updatedServices = [...selectedServices, service];
    }
    setSelectedServices(updatedServices);
  };

  const handleBeforeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBeforeImage(URL.createObjectURL(file));
      setBeforeImageName(file.name);
    }
  };

  const truncateFileName = (name) => {
    return name.length > 20 ? name.substring(0, 17) + '...' : name;
  };

  // Step 1: Cemetery selection, order description, services, photo, date
  const renderStep1 = () => {
    // Get unique cemeteries from offered services
    const uniqueCemeteryIds = [...new Set(services.map((service) => service.id_cementery))];
    const availableCemeteries = cemeteriesData.filter((cemetery) =>
      uniqueCemeteryIds.includes(cemetery.id)
    );

    // Available services for the selected cemetery
    const availableServices = services.filter(
      (service) => service.id_cementery === parseInt(selectedCemetery)
    );

    return (
      <div className="flex">
        {/* Left Part */}
        <div className="w-[70%] pr-4">
          <h2 className="text-xl font-bold mb-4">{entrepreneur.name}</h2>

          <div className="flex mb-4">
            {/* Select Cemetery */}
            <div className="w-1/2 pr-2">
              <label className="block mb-2">
                Vyberte cintorín:
                <select
                  className="block w-full mt-1 p-2 border rounded"
                  value={selectedCemetery}
                  onChange={(e) => setSelectedCemetery(e.target.value)}
                >
                  <option value="">-- Vyberte cintorín --</option>
                  {availableCemeteries.map((cemetery) => (
                    <option key={cemetery.id} value={cemetery.id}>
                      {cemetery.name}, {cemetery.city}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Order Description */}
            <div className="w-1/2 pl-2">
              <label className="block mb-2">
                Popis objednávky:
                <input
                  type="text"
                  className="block w-full mt-1 p-2 border rounded"
                  value={orderDescription}
                  onChange={(e) => setOrderDescription(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* Services */}
          {selectedCemetery && (
            <div>
              {availableServices
                .slice(0, showAllServices ? availableServices.length : 5)
                .map((service) => {
                  const isSelected = selectedServices.includes(service);
                  return (
                    <div
                      key={service.id}
                      className={`flex items-center mb-2 cursor-pointer ${
                        isSelected ? 'bg-gray-200' : ''
                      }`}
                      onClick={() => handleServiceSelection(service)}
                    >
                      <div className="w-3/4 flex items-center">
                        <span className="mr-2">{service.name}</span>
                        <span
                          className="text-blue-500 cursor-pointer"
                          title={service.description}
                        >
                          <i className="fas fa-info-circle"></i>
                        </span>
                      </div>
                      <div className="w-1/4 text-right">{service.price}</div>
                    </div>
                  );
                })}
              {availableServices.length > 5 && !showAllServices && (
                <button
                  className="text-blue-500 underline"
                  onClick={() => setShowAllServices(true)}
                >
                  Zobraziť všetky
                </button>
              )}
            </div>
          )}

          {/* Total */}
          <div className="mt-4 text-lg font-bold">Celkom csetko: {totalPrice} EUR</div>
        </div>

        {/* Right Part */}
        <div className="w-[30%] pl-4">
          <label className="block mb-2 text-lg font-bold">Fotka pred:</label>
          <label
            className="block cursor-pointer"
            onClick={() => beforeImageInputRef.current.click()}
          >
            <div className="flex justify-center mb-3">
              {beforeImage ? (
                <img
                  src={beforeImage}
                  alt="Fotka pred"
                  className="w-30 h-auto rounded-lg shadow-lg"
                />
              ) : (
                <div className="text-center border-[3px] p-6 rounded-2xl">
                  <img
                    src="/images/gallery.png"
                    alt="Žiadna fotka"
                    className="w-20 h-20 mx-auto"
                  />
                  <p className="text-gray-500">Nebola pridaná žiadna fotka</p>
                </div>
              )}
            </div>
            {beforeImageName && (
              <p className="text-sm text-gray-600">
                {truncateFileName(beforeImageName)}
              </p>
            )}
            <input
              type="file"
              ref={beforeImageInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleBeforeImageChange}
            />
          </label>

          {/* Select Date */}
          <div className="mt-4">
            <label className="block mb-2">
              Vyberte dátum:
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                dateFormat="dd/MM/yyyy"
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
          </div>

          {/* Next Button */}
          <div className="mt-4 flex justify-end">
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded"
              onClick={handleNextStep}
            >
              Pokračovať
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Step 2: Customer billing details, supplier details, summary
  const renderStep2 = () => {
    const selectedCemeteryData = cemeteriesData.find(
      (cemetery) => cemetery.id === parseInt(selectedCemetery)
    );

    return (
      <div className="flex">
        {/* Left Part */}
        <div className="w-[70%] pr-4">
          <h2 className="text-xl font-bold mb-4">Fakturačné údaje objednávateľa</h2>

          {/* Billing Details Form */}
          <div className="mb-4">
            <label className="block mb-2">
              Meno a priezvisko:
              <input
                type="text"
                className="block w-full mt-1 p-2 border rounded"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Adresa:
              <input
                type="text"
                className="block w-full mt-1 p-2 border rounded"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                className="block w-full mt-1 p-2 border rounded"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Telefón:
              <input
                type="tel"
                className="block w-full mt-1 p-2 border rounded"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </label>
          </div>

          <h2 className="text-xl font-bold mb-4">Údaje dodávateľa</h2>

          {/* Supplier Details */}
          <div className="mb-4">
            <p>
              <strong>Názov:</strong> {entrepreneur.name}
            </p>
            <p>
              <strong>Adresa:</strong> {entrepreneur.address}
            </p>
            <p>
              <strong>Email:</strong> {entrepreneur.email}
            </p>
            <p>
              <strong>Telefón:</strong> {entrepreneur.phone}
            </p>
          </div>

          {/* Payment Details Placeholder */}
          <h2 className="text-xl font-bold mb-4">Platobné údaje</h2>
          <p>Platobná brána ešte nie je implementovaná.</p>

          {/* Buttons */}
          <div className="mt-4 flex justify-between">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handlePreviousStep}
            >
              Späť
            </button>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded"
              onClick={handleFinish}
            >
              Dokončiť
            </button>
          </div>
        </div>

        {/* Right Part */}
        <div className="w-[30%] pl-4">
          <h2 className="text-xl font-bold mb-4">Zúčtovanie</h2>
          <div className="mb-4">
            <h3 className="font-bold">Služby:</h3>
            <ul className="list-disc pl-5">
              {selectedServices.map((s) => (
                <li key={s.id}>
                  {s.name} - {s.price}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <p>
              <strong>Termín dokončenia:</strong> {deadline.toLocaleDateString()}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Celková cena:</strong> {totalPrice} EUR
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      default:
        return null;
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-4">{renderCurrentStep()}</div>
    </Modal>
  );
};

export default OrderModal;
