import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';  // Kontext pre autentifikáciu

const RegisterModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const { registerUser } = useAuth();  // Funkcia registerUser z AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [showModal, setShowModal] = useState(false);  // Stav pre plynulý prechod

  // Spustí animáciu pre modal, ak sa otvorí
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 50); // Krátke oneskorenie, aby sa modal otvoril s animáciou
    } else {
      setShowModal(false); // Skryje modal po animácii
    }
  }, [isOpen]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const personalData = {
      email,
      password,
      name,
      address,
      phoneNumber,
    };

    // registerUser(personalData);  // Volanie registrácie
    onRegisterSuccess(personalData); 
  };

  if (!isOpen && !showModal) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm transition-opacity duration-1000 ease-in-out p-4 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white p-5 rounded-2xl shadow-lg w-full max-w-2xl relative transition-transform duration-700 ease-in-out ${
          showModal ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: 'auto', width: 'auto' }}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          ✕
        </button>
        <div className="bg-purple-200 p-3 rounded-full flex justify-center">
          <h2 className="text-3xl font-bold text-center">Pridaj sa k Gravecare ešte dnes!</h2>
        </div>

        <form onSubmit={handleRegister}>
          <div className="flex justify-between">
            {/* Nadpisy sekcií */}
            <div className="w-1/2 text-center">
              <h3 className="text-lg font-semibold">Prihlasovacie údaje</h3>
            </div>
            <div className="w-1/2 text-center">
              <h3 className="text-lg font-semibold">Osobné údaje</h3>
            </div>
          </div>

          <div className="flex justify-between p-2 rounded-3xl">
            {/* Prihlasovacie údaje */}
            <div className="w-1/2 bg-purple-300 p-4 rounded-3xl">
              <div className="mb-3">
                <label className="block text-sm font-bold mb-2">Zadajte Email:</label>
                <div className="bg-white p-2 rounded-xl">
                  <input 
                    type="email" 
                    placeholder="adresa@adresa.com" 
                    className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-bold mb-2">Zadajte heslo:</label>
                <div className="bg-white p-2 rounded-xl">
                  <input 
                    type="password" 
                    placeholder="********" 
                    className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-bold mb-2">Zopakujte heslo:</label>
                <div className="bg-white p-2 rounded-xl">
                  <input 
                    type="password" 
                    placeholder="********" 
                    className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required
                  />
                </div>
              </div>
            </div>

            <div className="border-r-2 mx-2"></div> {/* Vertikálna čiara medzi sekciami */}

            {/* Osobné údaje */}
            <div className="w-1/2 bg-purple-300 p-4 rounded-3xl">
              <div className="mb-3">
                <label className="block text-sm font-bold mb-2">Meno a Priezvisko:</label>
                <div className="bg-white p-2 rounded-xl">
                  <input 
                    type="text" 
                    placeholder="Meno a Priezvisko" 
                    className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-bold mb-2">Adresa:</label>
                <div className="bg-white p-2 rounded-xl">
                  <input 
                    type="text" 
                    placeholder="Adresa, Mesto, PSC" 
                    className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-bold mb-2">Telefónne číslo:</label>
                <div className="bg-white p-2 rounded-xl">
                  <input 
                    type="tel" 
                    placeholder="+421 XXX XXX XXX" 
                    className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" required />
            <p className="text-xs">Kliknutím na Zaregistrovať súhlasíš so <a href="#" className="text-purple-600">Zmluvnými podmienkami</a> spoločnosti Gravecare, našimi <a href="#" className="text-purple-600">Zásadami ochrany osobných údajov</a> a <a href="#" className="text-purple-600">Oznámením o práve na stiahnutie EÚ, EHS/UK.</a></p>
          </div>

          <div className="mt-4 flex justify-center">
            <button 
              type="submit" 
              className="bg-purple-400 text-white w-1/2 py-2 rounded-2xl text-lg font-semibold hover:bg-purple-600 transition duration-1000"
            >
              Registrovať
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
