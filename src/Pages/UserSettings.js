import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext'; // Prístup k AuthContext
import UserLayout from '../Layouts/UserLayout';
import { useSettings } from '../Context/SettingsContext';
import EmailNotifications from '../Components/EmailNotifications';
import SmsNotifications from '../Components/SmsNotifications';
import TwoFactorAuth from '../Components/TwoFactorAuth';
import LanguageSettings from '../Components/LanguageSettings';

const UserSettings = () => {
    const { personalData } = useAuth(); // Získame osobné a firemné údaje z AuthContextu
    const {
        emailNotificationsEnabled,
        toggleEmailNotifications,
        smsNotificationsEnabled,
        toggleSmsNotifications,
        twoFactorAuthEnabled,
        toggleTwoFactorAuth,
        selectedLanguage,
        handleLanguageChange,
    } = useSettings();


    const [personalDetails, setPersonalDetails] = useState({
        name: '',
        address: '',
        email: '',
        phoneNumber: ''
    });

    const [passwordDetails, setPasswordDetails] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expirationDate: '', cvv: '' });

    useEffect(() => {
        if (personalData) {
            setPersonalDetails({
                name: personalData.name,
                address: personalData.address,
                email: personalData.email,
                phoneNumber: personalData.phoneNumber
            });
        }
    }, [personalData]);

    const handleInputChange = (e, section) => {
        const { name, value } = e.target;
        if (section === 'personal') {
            setPersonalDetails({ ...personalDetails, [name]: value });
        } else if (section === 'password') {
            setPasswordDetails({ ...passwordDetails, [name]: value });
        } else if (section === 'payment') {
            setPaymentDetails({ ...paymentDetails, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Personal Details:', personalDetails);
        console.log('Password Details:', passwordDetails);
        console.log('Payment Details:', paymentDetails); // Log payment details to check
    };

    if (!personalData) {
        return <div>Načítavam údaje...</div>;
    }


    return (
        <div>
            <UserLayout />
            <div className='min-h-screen w-[90%] bg-backroundPurple mx-auto rounded-[50px] p-4 mt-4'>
                <h2 className='text-2xl font-bold text-white text-left ml-4 mb-2'>Zmena osobných údajov:</h2>
                <form onSubmit={handleSubmit}>
                    <div className='bg-customSideBar grid grid-cols-2 gap-4 p-2 rounded-2xl'>
                        <div className='p-2'>
                            <label className='text-black font-bold'>Meno a priezvisko:</label>
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
                            <label className='text-black font-bold'>Adresa:</label>
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
                            <label className='text-black font-bold'>Email:</label>
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
                            <label className='text-black font-bold'>Telefónne číslo:</label>
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
                        <button type="submit" className="col-span-2 bg-purple-500 text-white p-2 rounded-lg my-3">Uložiť zmeny</button>
                    </div>
                </form>

                <h2 className='text-2xl font-bold text-white text-left ml-4 mb-2'>Zmena hesla:</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4 bg-customSideBar rounded-2xl p-2'>
                        <div className='p-2'>
                            <label className='text-black font-bold'>Pôvodné heslo:</label>
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
                            <label className='text-black font-bold'>Nové heslo:</label>
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
                            <label className='text-black font-bold'>Zopakujte heslo:</label>
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
                        <button type="submit" className="col-span-2 bg-purple-500 text-white p-2 rounded-lg my-4">Uložiť zmeny</button>
                    </div>
                </form>


                <h2 className='text-2xl font-bold text-white text-left ml-4 mb-2'>Zmena platobných údajov:</h2>
                <form onSubmit={handleSubmit}>
                    <div className='bg-customSideBar grid grid-cols-2 gap-4 p-2 rounded-2xl'>
                        <div className='p-2'>
                            <label className='text-black font-bold'>Číslo karty:</label>
                            <div className='bg-white rounded-xl p-1'>
                                <input
                                    type='text'
                                    className='w-full p-2 rounded-lg ml-1 bg-white text-black focus:outline-none'
                                    name='cardNumber'
                                    placeholder='1234 5678 9012 3456'
                                    value={paymentDetails.cardNumber}
                                    onChange={(e) => handleInputChange(e, 'payment')}
                                />
                            </div>
                        </div>
                        <div className='p-2'>
                            <label className='text-black font-bold'>Dátum expirácie:</label>
                            <div className='bg-white rounded-xl p-1'>
                                <input
                                    type='text'
                                    className='w-full p-2 rounded-lg ml-1 bg-white text-black focus:outline-none'
                                    name='expiryDate'
                                    placeholder='MM/RR'
                                    value={paymentDetails.expiryDate}
                                    onChange={(e) => handleInputChange(e, 'payment')}
                                />
                            </div>
                        </div>
                        <div className='p-2'>
                            <label className='text-black font-bold'>CVV:</label>
                            <div className='bg-white rounded-xl p-1'>
                                <input
                                    type='text'
                                    className='w-full p-2 rounded-lg ml-1 bg-white text-black focus:outline-none'
                                    name='cvv'
                                    placeholder='123'
                                    value={paymentDetails.cvv}
                                    onChange={(e) => handleInputChange(e, 'payment')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <button type='submit' className='col-span-2 bg-purple-500 text-white p-2 rounded-lg my-4'>
                            Uložiť platobné údaje
                        </button>
                    </div>
                </form>

                <h2 className='text-2xl font-bold text-white text-left ml-4 mb-4'>Dalsie moznosti nastavnia:</h2>

                <EmailNotifications
                    enabled={emailNotificationsEnabled}
                    toggle={toggleEmailNotifications}
                />
                <SmsNotifications
                    enabled={smsNotificationsEnabled}
                    toggle={toggleSmsNotifications}
                />
                <TwoFactorAuth
                    enabled={twoFactorAuthEnabled}
                    toggle={toggleTwoFactorAuth}
                />
                <LanguageSettings
                    selectedLanguage={selectedLanguage}
                    handleLanguageChange={handleLanguageChange}
                />
            </div>
        </div>
    );
};

export default UserSettings;
