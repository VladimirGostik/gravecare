import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal'; // Presuming you have a Modal component
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useService } from '../../Context/ServiceContext'; // Import useService for cemeteriesData
import { useAuth } from '../../Context/AuthContext'; // Import useService for cemeteriesData

import { FaInfoCircle } from 'react-icons/fa';

const OrderModal = ({ entrepreneur, services, onClose }) => {
  console.log(entrepreneur);
  const { cemeteriesData } = useService();
  const { personalData } = useAuth();

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
    setCustomerName(personalData.name);
    setCustomerAddress(personalData.address);
    setCustomerEmail(personalData.email);
    setCustomerPhone(personalData.phoneNumber);
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
    const uniqueCemeteryIds = [...new Set(services.map((service) => service.id_cementery))];
    const availableCemeteries = cemeteriesData.filter((cemetery) =>
      uniqueCemeteryIds.includes(cemetery.id)
    );
    const availableServices = services.filter(
      (service) => service.id_cementery === parseInt(selectedCemetery)
    );

    return (
      <div>
        <div className="text-center px-1">
          <h1 className="text-3xl font-bold mb-1">Zadajte objednávku</h1>
        </div>
        <div className="flex">
          {/* Left Part */}
          <div className="w-[70%] pr-4 bg-customPurpleNavbar rounded-[30px] p-2">
            {/* Provider and Cemetery Selection */}
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <div className="mb-2">
                  <label className="text-black font-bold pl-2">Poskytovateľ:</label>
                  <div className="bg-gray-200 rounded-3xl p-1 pl-4">Liesek s.r.o</div>
                </div>
                <div className="mb-2">
                  <label className="text-black font-bold pl-2">Vyberte cintorín:</label>
                  <select
                    className="block w-full p-1 pl-4 bg-white border rounded-3xl"
                    value={selectedCemetery}
                    onChange={(e) => setSelectedCemetery(e.target.value)}
                  >
                    <option value="">Vyberte cintorín</option>
                    {availableCemeteries.map((cemetery) => (
                      <option key={cemetery.id} value={cemetery.id}>
                        {cemetery.name}, {cemetery.city}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="block font-bold pl-2">Služby pre vybraný cintorín:</label>
              </div>
              {/* Order Description */}
              <div className="w-1/2 pl-2 pb-4">
                <label className="block font-bold">Popis objednávky:</label>
                <div className="bg-white rounded-3xl h-full">
                  <textarea
                    className="block w-full h-full rounded-3xl border-none p-2 focus:outline-none"
                    placeholder='Zadajte prosim detaily o polohe cintorina...'
                    value={orderDescription}
                    onChange={(e) => setOrderDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            {selectedCemetery && (
              <div>
                {availableServices
                  .slice(0, showAllServices ? availableServices.length : 5)
                  .map((service) => (
                    <div
                      key={service.id}
                      className="bg-white rounded-3xl p-1 mt-2 flex items-center justify-between cursor-pointer"
                      onClick={() => handleServiceSelection(service)}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceSelection(service)}
                          className="w-5 h-5 mx-1 pointer-events-none"
                        />
                        <span className="font-bol pl-2">{service.name}</span>
                        <span
                          className="ml-1 text-blue-500 cursor-pointer"
                          title={service.description}
                        >
                          <FaInfoCircle size={22} />
                        </span>
                      </div>
                      <div className="ml-auto bg-customPurpleNavbar rounded-3xl p-2">
                        {service.price}
                      </div>
                    </div>
                  ))}

                {availableServices.length > 5 && !showAllServices && (
                  <button
                    className="text-blue-500 underline mt-2"
                    onClick={() => setShowAllServices(true)}
                  >
                    Zobraziť všetky
                  </button>
                )}
              </div>
            )}
            {/* Total */}
            <div className="flex items-center bg-white rounded-3xl p-1 mt-6">
              <p className="text-lg font-bold pl-2">Celkom:</p>
              <div className="ml-auto bg-customPurpleNavbar rounded-3xl p-2 font-bold">
                {totalPrice} EUR
              </div>
            </div>
          </div>
          {/* Right Part */}
          <div className="w-[30%] pl-4">
            <label className="block mb-2 text-lg font-bold">Fotka pred:</label>
            <label className="block cursor-pointer" onClick={() => beforeImageInputRef.current.click()}>
              <div className="flex justify-center mb-3">
                {beforeImage ? (
                  <img src={beforeImage} alt="Fotka pred" className="w-30 h-auto rounded-lg shadow-lg" />
                ) : (
                  <div className="text-center border-[3px] p-6 rounded-2xl">
                    <img src="/images/gallery.png" alt="Žiadna fotka" className="w-20 h-20 mx-auto" />
                    <p className="text-gray-500">Nebola pridaná žiadna fotka</p>
                  </div>
                )}
              </div>
              {beforeImageName && (
                <p className="text-sm text-gray-600">{truncateFileName(beforeImageName)}</p>
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
                  className="block w-full mt-1 p-2 border rounded-3xl"
                />
              </label>
            </div>
            {/* Next Button */}
            <div className="mt-4 flex justify-center">
              <button
                className="bg-customPurpleNavbar text-black font-bold px-6 py-2 rounded-3xl"
                onClick={handleNextStep}
              >
                Pokračovať
              </button>
            </div>
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
      <div className="">
        {/* Left Part */}
        <h2 className="text-2xl text-center font-bold ">Fakturačné údaje objednávateľa</h2>
        <h2 className="text-xl font-bold mb-1 pl-4">Údaje objednávateľa:</h2>
        <div className="flex">
          <div className="w-[65%] pr-2">
            <div className='bg-customPurple rounded-[30px] p-2 mx-auto grid grid-cols-2 gap-1'> {/* Menšie okraje a menšie zaoblenie */}
              <div>
                <label className="block ml-1 font-bold text-white text-sm">Meno a priezvisko:</label> {/* Zmenšený margin a písmo */}
                <div className="bg-white block w-full mt-1 p-1 pl-2 rounded-xl shadow-md text-xs"> {/* Menšie padding a zaoblenie */}
                  {customerName}
                </div>
              </div>
              <div>
                <label className="block ml-1 font-bold text-white text-sm">Adresa:</label> {/* Zmenšený margin a písmo */}
                <div className="bg-white block w-full mt-1 p-1 pl-2 rounded-xl shadow-md text-xs">
                  {customerAddress}
                </div>
              </div>
              <div>
                <label className="block ml-1 font-bold text-white text-sm">Email:</label> {/* Zmenšený margin a písmo */}
                <div className="bg-white block w-full mt-1 p-1 pl-2 rounded-xl shadow-md text-xs">
                  {customerEmail}
                </div>
              </div>
              <div>
                <label className="block ml-1 font-bold text-white text-sm">Telefón:</label> {/* Zmenšený margin a písmo */}
                <div className="bg-white block w-full mt-1 p-1 pl-2 rounded-xl shadow-md mb-1 text-xs">
                  {customerPhone}
                </div>
              </div>
            </div>

            <h2 className="text-lg font-bold mb-1 pl-3">Údaje dodávateľa:</h2> {/* Zmenšené písmo a padding */}

            <div className='bg-customPurple rounded-[30px] p-2 mx-auto grid grid-cols-2 gap-2'> {/* Menšie zaoblenie, padding, a medzera */}
              <div>
                <label className="block ml-1 font-bold text-white text-sm">Názov dodávateľa:</label> {/* Zmenšený margin a písmo */}
                <div className="bg-white block w-full mt-1 p-1 pl-2 rounded-xl shadow-md text-xs">
                  {entrepreneur.companyName}
                </div>
              </div>
              <div>
                <label className="block ml-1 font-bold text-white text-sm">Adresa:</label> {/* Zmenšený margin a písmo */}
                <div className="bg-white block w-full mt-1 p-1 pl-2 rounded-xl shadow-md text-xs">
                  {entrepreneur.address}
                </div>
              </div>
              <div>
                <label className="block ml-1 font-bold text-white text-sm">Email:</label> {/* Zmenšený margin a písmo */}
                <div className="bg-white block w-full mt-1 p-1 pl-2 rounded-xl shadow-md text-xs">
                  {entrepreneur.email}
                </div>
              </div>
              <div>
                <label className="block ml-1 font-bold text-white text-sm">Telefón:</label> {/* Zmenšený margin a písmo */}
                <div className="bg-white block w-full mt-1 p-1 pl-2 rounded-xl shadow-md mb-1 text-xs">
                  {entrepreneur.phoneNumber}
                </div>
              </div>
            </div>

            <h2 className="font-bold text-lg mb-1 pl-3">Platobné údaje</h2> {/* Zmenšené písmo a padding */}

            {/* Payment Details Placeholder */}
            <div className='bg-customPurple rounded-[30px] p-3 mx-auto flex flex-col grid-rows-2'>
              <div className="bg-white block w-full mt-1 p-1 pl-2 rounded-3xl shadow-lg mb-1 text-xs">
                Platobná brána ešte nie je implementovaná.
              </div>
            </div>
            <div className="mt-2 mx-8 flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-3xl"
                onClick={handlePreviousStep}
              >
                Späť
              </button>
              <button
                className="bg-customPurpleNavbar text-white px-4 py-2 rounded-3xl"
                onClick={handleFinish}
              >
                Dokončiť a pokračovať k platbe
              </button>
            </div>
          </div>

          {/* Right Part */}
          <div className="w-[35%] pl-4 bg-customSideBar rounded-[40px] p-3">
            <h2 className="text-lg font-bold mb-1 ">Zúčtovanie</h2>
            <div className="mb-2">
              <h3 className="font-bold pl-2 text-sm">Služby:</h3>
              <div className='bg-white rounded-3xl p-2'>
                <ul className="list-disc pl-4 text-xs">
                  {selectedServices.map((s) => (
                    <li key={s.id}>
                      {s.name} - <span className="font-bold text-xs">{s.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mb-2">
              <p className='font-bold mb-1 pl-2 text-sm'>Vybraný cintorín:</p>
              <div className="bg-white block w-auto px-3 p-1 pl-2 rounded-3xl shadow-lg mb-2 text-center font-bold text-sm">
                {selectedCemeteryData ? `${selectedCemeteryData.name}` : "Žiadny cintorín nebol vybraný"}
              </div>
            </div>

            <div className="mb-2">
              <p className='font-bold pl-2 mb-1 text-sm'> Termín dokončenia do:</p>
              <div className="bg-white block w-auto px-3 p-1 pl-2 rounded-3xl shadow-lg mb-2 text-center font-bold text-sm">
                {deadline.toLocaleDateString()}
              </div>
              <p className='text-center text-xs text-gray-700 px-2 '>*Termin dokoncenia budete mat presne urcený po potvdeni dodavatelom. Termin nepresiahne vami urceny deadline.</p>
            </div>

            <div className="flex justify-between items-center mb-2 bg-white p-1 rounded-3xl">
              {/* Ľavá strana s textom */}
              <div className="text-left font-bold pl-2 text-sm">
                <p>Celková cena:</p>
              </div>

              {/* Pravá strana s cenou */}
              <div className="bg-customPurple block w-auto px-4 py-1 rounded-3xl shadow-lg text-white text-center font-bold text-sm">
                {totalPrice} EUR
              </div>
            </div>

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
