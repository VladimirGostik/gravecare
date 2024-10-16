import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth(); // Získanie funkcie login z AuthContext
  const [email, setEmail] = useState(''); // Stav pre email
  const [password, setPassword] = useState(''); // Stav pre heslo
  const navigate = useNavigate(); // Používame na presmerovanie

  const [showModal, setShowModal] = useState(false); // Stav pre plynulý prechod

  // Spustí animáciu pre modal, ak sa otvorí
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 0); // Krátke oneskorenie pre plynulý prechod
    } else {
      setShowModal(false); // Zatvorenie modalu po animácii
    }
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password); // Zavolanie funkcie login z AuthContext
    if (email === 'business@test.com') {
      navigate('/business/orders/confirm'); // Presmerovanie pre podnikateľa
    } else if (email === 'user@test.com') {
      navigate('/home'); // Presmerovanie pre bežného používateľa
    }
    onClose(); // Zavrieť modal po prihlásení
  };

  if (!isOpen && !showModal) return null; // Ak modal nie je otvorený, nevracaj nič.

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm transition-opacity duration-700 ease-in-out p-4 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white p-5 rounded-2xl shadow-lg w-full max-w-md relative transition-transform duration-300 ease-in-out ${
          showModal ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          ✕
        </button>
        <div className="bg-purple-200 p-3 mb-5 rounded-full flex justify-center">
          <h2 className="text-3xl font-bold text-center">Prihláste sa</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className='bg-purple-300 p-4 rounded-3xl'>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email:</label>
              <div className="bg-white p-2 rounded-xl">
                <input 
                  type="email" 
                  placeholder="example@gmail.com" 
                  className="w-full p-3 rounded-xl text-gray-700 focus:outline-none"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} // Ukladanie emailu
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Heslo:</label>
              <div className="bg-white p-2 rounded-xl">
                <input 
                  type="password" 
                  placeholder="********" 
                  className="w-full p-3 rounded-xl text-gray-700 focus:outline-none"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} // Ukladanie hesla
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-between mb-2 text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Zapamätaj si ma
              </label>
              <a href="#" className="text-purple-600">Zabudli ste heslo?</a>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button 
              type="submit" 
              className="bg-purple-400 text-white w-1/2 py-1 rounded-2xl text-lg font-semibold hover:bg-purple-600 transition duration-700 mx-auto"
            >
              Prihlásiť sa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
