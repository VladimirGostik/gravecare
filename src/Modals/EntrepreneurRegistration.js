import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';

const EntrepreneurRegistration = ({ isOpen, onClose, personalData = {} }) => {
  const { registerEntrepreneur } = useAuth(); // Použijeme registerUser z AuthContext
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Krok 2: Profesionálne údaje
  const [adresa1, setAdresa1] = useState('');
  const [adresa2, setAdresa2] = useState('');
  const [mesto, setMesto] = useState('');
  const [psc, setPsc] = useState('');
  const [ico, setIco] = useState('');
  const [dic, setDic] = useState('');
  const [icdph, setIcdph] = useState('');
  const [iban, setIban] = useState('');

  const [step, setStep] = useState(1);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyLogoName, setCompanyLogoName] = useState('');
  const [companyName, setCompanyName] = useState('');

  // Použitie údajov z `personalData` s default hodnotami
  const [fullName, setFullName] = useState(personalData.name || '');
  const [email, setEmail] = useState(personalData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(personalData.phoneNumber || '');
  const [personalAdress, setPersonalAdress] = useState(personalData.address || '');


  useEffect(() => {
    // Ak sa zmení personalData, aktualizujeme hodnoty pre osobné údaje
    if (personalData) {
      setFullName(personalData.name || '');
      setEmail(personalData.email || '');
      setPhoneNumber(personalData.phoneNumber || '');
      setPersonalAdress(personalData.address || '');
    }
  }, [personalData]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleCompleteRegistration = async () => {
    setLoading(true);
    const companyData = {
      adresa1, adresa2, mesto, psc, ico, dic, icdph, iban, companyName, companyLogo
    };

    try {
      await registerEntrepreneur(personalData, companyData);  // Posielame údaje do AuthContext
      navigate('/business/orders/confirm');  // Presmerovanie pre podnikateľa
    } catch (error) {
      console.error('Chyba pri dokončení registrácie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result);
        setCompanyLogoName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-2xl shadow-lg w-[90vw] h-[80vh] max-w-5xl relative overflow-auto flex flex-col">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          ✕
        </button>

        {/* Nadpis */}
        <div className="bg-purple-200 p-3 mb-6 rounded-full flex justify-center">
          <h2 className="text-3xl font-bold text-center">Podnikateľské údaje</h2>
        </div>

        <div className="flex flex-grow">
          {/* Sidebar pre kroky */}
          <div className="w-1/12 flex flex-col justify-center items-center">
            <h3 className="font-bold mb-4">Krok:</h3>
            <div className="flex flex-col justify-between items-center space-y-6">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                1
              </div>
              <div className="w-px h-16 bg-black"></div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
              <div className="w-px h-16 bg-black"></div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                3
              </div>
            </div>
          </div>

          <div className="border-r-2 h-full mr-4"></div> {/* Vertikálna čiara */}

          {/* Obsah pre formulár */}
          <div className="w-11/12">
            {step === 1 && (
              <div className="text-center">
                <div className="mb-6">
                  <label className="block font-semibold mb-2 text-center">*Pridajte logo firmy:</label>
                  <div className="flex justify-center items-center mb-4">
                    <label htmlFor="company-logo-upload" className="cursor-pointer">
                      <img
                        src={companyLogo || '/images/add-photo.png'}
                        alt="Logo upload"
                        className="w-20 h-auto"
                      />
                    </label>
                    <input
                      id="company-logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </div>
                  {companyLogoName && (
                    <p className="text-sm text-gray-500 mt-2">{companyLogoName}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block font-semibold mb-2 text-center">*Pridajte názov firmy:</label>
                  <input
                    type="text"
                    placeholder="Názov firmy"
                    style={{
                      backgroundColor: '#E5E7EB',
                      color: '#6B7280',
                      padding: '12px',
                      borderRadius: '9999px',
                      width: '60%',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <button onClick={nextStep} className="bg-purple-600 text-white py-2 px-6 rounded-full">
                  Pokračovať
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center">
                <div className="bg-purple-200 p-4 rounded-xl w-full lg:w-[100%]">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-left">Adresa 1:</label>
                      <div className="bg-white p-2 rounded-xl">
                        <input
                          type="text"
                          value={adresa1}
                          onChange={(e) => setAdresa1(e.target.value)}
                          placeholder="Adresa 1..."
                          className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-left">Adresa 2:</label>
                      <div className="bg-white p-2 rounded-xl">
                        <input
                          type="text"
                          value={adresa2}
                          onChange={(e) => setAdresa2(e.target.value)}
                          placeholder="Adresa 2..."
                          className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-left">PSČ:</label>
                      <div className="bg-white p-2 rounded-xl">
                        <input
                          type="text"
                          value={psc}
                          onChange={(e) => setPsc(e.target.value)}
                          placeholder="PSČ..."
                          className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-left">Mesto:</label>
                      <div className="bg-white p-2 rounded-xl">
                        <input
                          type="text"
                          value={mesto}
                          onChange={(e) => setMesto(e.target.value)}
                          placeholder="Mesto..."
                          className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-left">IČO:</label>
                      <div className="bg-white p-2 rounded-xl">
                        <input
                          type="text"
                          value={ico}
                          onChange={(e) => setIco(e.target.value)}
                          placeholder="IČO..."
                          className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-left">DIČ:</label>
                      <div className="bg-white p-2 rounded-xl">
                        <input
                          type="text"
                          value={dic}
                          onChange={(e) => setDic(e.target.value)}
                          placeholder="DIČ..."
                          className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-left">IČ DPH:</label>
                      <div className="bg-white p-2 rounded-xl">
                        <input
                          type="text"
                          value={icdph}
                          onChange={(e) => setIcdph(e.target.value)}
                          placeholder="IČ DPH..."
                          className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-left">IBAN/Číslo účtu:</label>
                      <div className="bg-white p-2 rounded-xl">
                        <input
                          type="text"
                          value={iban}
                          onChange={(e) => setIban(e.target.value)}
                          placeholder="1234 1324 1234 1234"
                          className="w-full p-1 rounded-xl text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between w-[85%]">
                  <button onClick={prevStep} className="bg-gray-300 py-2 px-6 rounded-full">Späť</button>
                  <button onClick={nextStep} className="bg-purple-600 text-white py-2 px-6 rounded-full">Pokračovať</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center">
                <div className="w-full flex justify-between mb-4">
                  {/* Osobné údaje */}
                  <div className="w-1/3 p-2 border-r-2">
                    <h4 className="font-bold mb-2 text-lg">Osobné údaje:</h4>
                    <p><strong>Meno a priezvisko:<br /></strong> {fullName}</p>
                    <p><strong>Email:<br /></strong> {email}</p>
                    <p><strong>Telefónne číslo:<br /></strong> {phoneNumber}</p>
                    <p><strong>Osobná adresa:<br /></strong> {personalAdress}</p>
                  </div>

                  {/* Profesionálne údaje */}
                  <div className="w-1/3 p-1 border-r-2">
                    <h4 className="font-bold mb-2 text-lg">Profesionálne údaje:</h4>
                    <p><strong>Adresa 1:<br /></strong> {adresa1}</p>
                    <p><strong>Adresa 2:<br /></strong> {adresa2}</p>
                    <p><strong>Mesto/PSČ:<br /></strong> {mesto}, {psc}</p>
                    <p><strong>IČO:<br /></strong> {ico}</p>
                    <p><strong>DIČ:<br /></strong> {dic}</p>
                    <p><strong>IČ DPH:<br /></strong> {icdph}</p>
                  </div>

                  {/* Logo a názov firmy */}
                  <div className="w-1/3 p-2">
                    <h4 className="font-bold mb-2 text-lg">Firma:</h4>
                    <div className="mb-2">
                      <label className="block mb-1 text-sm font-semibold">Logo firmy:</label>
                      <div className="flex justify-center">
                        <img
                          src={companyLogo || '/images/add-photo.png'}
                          alt="Logo firmy"
                          className="w-20"
                        />
                      </div>
                    </div>
                    <p><strong>Názov firmy:<br /></strong> {companyName}</p>
                    <p><strong>IBAN:<br /></strong> {iban}</p>
                  </div>
                </div>

                <div className="flex justify-between w-[85%]">
                  <button onClick={prevStep} className="bg-gray-300 py-1 px-4 rounded-full">
                    Späť
                  </button>
                  <button onClick={handleCompleteRegistration} disabled={loading} className="bg-purple-600 text-white py-2 px-6 rounded-full">
                    {loading ? 'Odosielam...' : 'Dokončiť'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurRegistration;