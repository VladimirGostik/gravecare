import React, { useState, useEffect } from 'react';
import BusinessLayout from '../Layouts/BusinessLayout';
import ProfileTabNavigation from '../Components/ProfileTabNavigation';
import { useAuth } from '../Context/AuthContext'; // Prístup k AuthContext

const EditProfile = () => {
    const { personalData, companyData } = useAuth(); // Získame osobné a firemné údaje z AuthContextu

    const [personalDetails, setPersonalDetails] = useState({
        name: '',
        address: '',
        email: '',
        phoneNumber: ''
    });
    const [professionalDetails, setProfessionalDetails] = useState({
        adresa1: '',
        adresa2: '',
        mesto: '',
        psc: ''
    });
    const [passwordDetails, setPasswordDetails] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [paymentDetails, setPaymentDetails] = useState({ iban: '', ico: '', dic: '', icdph: '' });
    const [companyDetails, setCompanyDetails] = useState({ companyName: '', companyLogo: null });

    // Nastavenie počiatočných hodnôt, keď sú údaje načítané
    useEffect(() => {
        if (personalData) {
            setPersonalDetails({
                name: personalData.name,
                address: personalData.address,
                email: personalData.email,
                phoneNumber: personalData.phoneNumber
            });
        }
        if (companyData) {
            setProfessionalDetails({
                adresa1: companyData.adresa1,
                adresa2: companyData.adresa2,
                mesto: companyData.mesto,
                psc: companyData.psc,
            });
            setPaymentDetails({
                ico: companyData.ico,
                dic: companyData.dic,
                icdph: companyData.icdph,
                iban: companyData.iban,
            });
            setCompanyDetails({
                companyName: companyData.companyName,
                companyLogo: companyData.companyLogo,
            });
        }
    }, [personalData, companyData]);

    // Funkcia na aktualizáciu hodnôt v formulári
    const handleInputChange = (e, section) => {
        const { name, value } = e.target;
        if (section === 'personal') {
            setPersonalDetails({ ...personalDetails, [name]: value });
        } else if (section === 'professional') {
            setProfessionalDetails({ ...professionalDetails, [name]: value });
        } else if (section === 'password') {
            setPasswordDetails({ ...passwordDetails, [name]: value });
        } else if (section === 'payment') {
            setPaymentDetails({ ...paymentDetails, [name]: value });
        } else if (section === 'company') {
            setCompanyDetails({ ...companyDetails, [name]: value });
        }
    };

    // Funkcia na spracovanie nahrania loga
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCompanyDetails({ ...companyDetails, companyLogo: URL.createObjectURL(file) });
        }
    };

    // Dummy funkcia na spracovanie formulárov
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Personal Details:', personalDetails);
        console.log('Professional Details:', professionalDetails);
        console.log('Password Details:', passwordDetails);
        console.log('Payment Details:', paymentDetails);
        console.log('Company Details:', companyDetails);
    };

    if (!personalData) {
        return <div>Načítavam údaje...</div>;
    }

    return (
        <BusinessLayout>
            <ProfileTabNavigation />
            <div className='h-auto w-full bg-backroundPurple mt-2 rounded-[50px] p-4'>
                {/* Zmena osobných údajov */}
                {companyData && (
                    <>
                        <h2 className='text-xl font-bold text-white text-center mb-2 ml-4'>Logo a názov firmy:</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="p-4 grid grid-cols-1 bg-customPurpleNavbar rounded-[30px] w-1/2 mx-auto">
                                {/* Logo a Názov firmy */}
                                <div className="flex items-center justify-start mb-4">
                                    {/* Logo */}
                                    <div className="flex flex-col items-center mr-4 p-1">
                                        <label htmlFor="logoUpload" className="cursor-pointer">
                                            <img
                                                src={companyDetails.companyLogo || '/images/add-photo.png'} // Zobrazí sa predvolené logo, ak žiadne nie je
                                                alt="Logo firmy"
                                                className={`w-24 ${companyDetails.companyLogo ? 'h-auto' : 'h-18'} rounded-xl bg-customPurpleNavbar`}
                                            />
                                        </label>
                                        <input
                                            type="file"
                                            id="logoUpload"
                                            className="hidden"
                                            onChange={handleLogoUpload}
                                        />
                                        <span className="text-white text-xs mt-2">Zmeniť logo</span>
                                    </div>

                                    {/* Názov firmy */}
                                    <div className="flex flex-col w-[100%]">
                                        <label className="text-white font-bold mb-2">Názov firmy:</label>
                                        <div className="bg-white rounded-xl p-2">
                                            <input
                                                type="text"
                                                className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none"
                                                name="companyName"
                                                value={companyDetails.companyName || ''}
                                                onChange={(e) => handleInputChange(e, 'company')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button type="submit" className="col-span-1 bg-purple-500 text-white p-2 rounded-lg mt-4">
                                    Uložiť zmeny
                                </button>
                            </div>
                        </form>
                    </>
                )}

                <h2 className='text-xl font-bold text-white text-left ml-4 mb-2'>Zmena osobných údajov:</h2>
                <form onSubmit={handleSubmit}>
                    <div className='bg-customPurpleNavbar grid grid-cols-2 gap-4 p-2 rounded-[30px]'>
                        <div className='p-2'>
                            <label className='text-white font-bold'>Meno a priezvisko:</label>
                            <div className='bg-white rounded-xl p-1'>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded-lg ml-1 bg-white text-black focus:outline-none focus:border-none "
                                    name="name"
                                    value={personalDetails?.name || ''}
                                    onChange={(e) => handleInputChange(e, 'personal')}
                                />
                            </div>
                        </div>
                        <div className='p-2'>
                            <label className='text-white font-bold'>Adresa:</label>
                            <div className='bg-white rounded-xl p-1'>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded-lg ml-1 bg-white text-black focus:outline-none focus:border-none "
                                    name="address"
                                    value={personalDetails?.address || ''}
                                    onChange={(e) => handleInputChange(e, 'personal')}
                                />
                            </div>
                        </div>
                        <div className='p-2'>
                            <label className='text-white font-bold'>Email:</label>
                            <div className='bg-white rounded-xl p-1'>
                                <input
                                    type="email"
                                    className="w-full p-2 rounded-lg ml-1 bg-white text-black focus:outline-none focus:border-none "
                                    name="email"
                                    value={personalDetails?.email || ''}
                                    onChange={(e) => handleInputChange(e, 'personal')}
                                />
                            </div>
                        </div>
                        <div className='p-2'>
                            <label className='text-white font-bold'>Telefónne číslo:</label>
                            <div className='bg-white rounded-xl p-1'>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded-lg ml-1 bg-white text-black focus:outline-none focus:border-none "
                                    name="phoneNumber"
                                    value={personalDetails?.phoneNumber || ''}
                                    onChange={(e) => handleInputChange(e, 'personal')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <button type="submit" className="col-span-2 bg-purple-500 text-white p-2 rounded-lg mt-4">Uložiť zmeny</button>
                    </div>
                </form>

                {/* Zmena profesionálnych údajov */}
                {companyData && (
                    <>
                        <h2 className='text-xl font-bold text-white text-left ml-4 mb-2'>Zmena profesionálnych údajov:</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='bg-customPurpleNavbar grid grid-cols-2 gap-4 p-2 rounded-[30px]'>
                                <div className='p-2'>
                                    <label className='text-white font-bold'>Adresa 1:</label>
                                    <div className='bg-white rounded-xl p-1'>
                                        <input
                                            type="text"
                                            className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                            name="adresa1"
                                            value={professionalDetails?.adresa1 || ''}
                                            onChange={(e) => handleInputChange(e, 'professional')}
                                        />
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <label className='text-white font-bold'>Adresa 2:</label>
                                    <div className='bg-white rounded-xl p-1'>
                                        <input
                                            type="text"
                                            className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                            name="adresa2"
                                            value={professionalDetails?.adresa2 || ''}
                                            onChange={(e) => handleInputChange(e, 'professional')}
                                        />
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <label className='text-white font-bold'>Mesto:</label>
                                    <div className='bg-white rounded-xl p-1'>
                                        <input
                                            type="text"
                                            className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                            name="mesto"
                                            value={professionalDetails?.mesto || ''}
                                            onChange={(e) => handleInputChange(e, 'professional')}
                                        />
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <label className='text-white font-bold'>PSČ:</label>
                                    <div className='bg-white rounded-xl p-1'>
                                        <input
                                            type="text"
                                            className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                            name="psc"
                                            value={professionalDetails?.psc || ''}
                                            onChange={(e) => handleInputChange(e, 'professional')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <button type="submit" className="col-span-2 bg-purple-500 text-white p-2 rounded-lg mt-4">Uložiť zmeny</button>
                            </div>
                        </form>
                    </>
                )}

                {/* Zmena hesla */}
                <h2 className='text-xl font-bold text-white text-left ml-4 mb-2'>Zmena hesla:</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4 bg-customPurpleNavbar rounded-[30px] p-2'>
                        <div className='p-2'>
                            <label className='text-white font-bold'>Pôvodné heslo:</label>
                            <div className='bg-white rounded-xl p-1'>
                                <input
                                    type="password"
                                    className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                    name="currentPassword"
                                    placeholder='********'
                                    value={passwordDetails.currentPassword}
                                    onChange={(e) => handleInputChange(e, 'password')}
                                />
                            </div>
                        </div>
                        <div className='p-2'>
                            <label className='text-white font-bold'>Nové heslo:</label>
                            <div className='bg-white rounded-xl p-1'>
                                <input
                                    type="password"
                                    className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                    name="newPassword"
                                    placeholder='********'
                                    value={passwordDetails.newPassword}
                                    onChange={(e) => handleInputChange(e, 'password')}
                                />
                            </div>
                        </div>
                        <div className='p-2'>
                            <label className='text-white font-bold'>Zopakujte heslo:</label>
                            <div className='bg-white rounded-xl p-1'>
                                <input
                                    type="password"
                                    className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                    name="confirmPassword"
                                    placeholder='********'
                                    value={passwordDetails.confirmPassword}
                                    onChange={(e) => handleInputChange(e, 'password')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <button type="submit" className="col-span-2 bg-purple-500 text-white p-2 rounded-lg mt-4">Uložiť zmeny</button>
                    </div>
                </form>

                {/* Platobné údaje */}
                {companyData && (
                    <>
                        <h2 className='text-xl font-bold text-white text-left mb-4 ml-4'>Platobné údaje:</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='p-4 grid grid-cols-2 gap-4 bg-customPurpleNavbar rounded-[30px]'>
                                <div className='p-2'>
                                    <label className='text-white font-bold'>IBAN/Číslo účtu:</label>
                                    <div className='bg-white rounded-xl p-1'>
                                        <input
                                            type="text"
                                            className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                            name="iban"
                                            value={paymentDetails.iban || ''}
                                            onChange={(e) => handleInputChange(e, 'payment')}
                                        />
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <label className='text-white font-bold'>IČ-DPH</label>
                                    <div className='bg-white rounded-xl p-1'>
                                        <input
                                            type="text"
                                            className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                            name="icdph"
                                            value={paymentDetails.icdph || ''}
                                            onChange={(e) => handleInputChange(e, 'payment')}
                                        />
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <label className='text-white font-bold'>IČO:</label>
                                    <div className='bg-white rounded-xl p-1'>
                                        <input
                                            type="text"
                                            className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                            name="ico"
                                            value={paymentDetails?.ico || ''}
                                            onChange={(e) => handleInputChange(e, 'payment')}
                                        />
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <label className='text-white font-bold'>DIČ:</label>
                                    <div className='bg-white rounded-xl p-1'>
                                        <input
                                            type="text"
                                            className="w-full p-2 ml-1 rounded-lg bg-white text-black focus:outline-none focus:border-none "
                                            name="dic"
                                            value={paymentDetails?.dic || ''}
                                            onChange={(e) => handleInputChange(e, 'payment')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex justify-center items-center mb-4'>
                                <button type="submit" className="col-span-1 bg-purple-500 text-white p-2 rounded-lg mt-4">Uložiť zmeny</button>
                            </div>
                        </form>
                    </>
                )}

                {/* Zmena loga a názvu firmy */}

            </div>
        </BusinessLayout>
    );
};

export default EditProfile;
