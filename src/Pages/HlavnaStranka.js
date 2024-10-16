import React, { useState } from 'react';
import { Header, Hero, HowItWorks, BecomePart } from '../Components/MainPageComponents';
import Footer from "../Components/Footer";
import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';
import ChooseUserTypeModal from '../Modals/ChooseUserTypeModal'; // Import ChooseUserTypeModal

const Hlavnastranka = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Stav pre login modal
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Stav pre register modal
    const [isChooseUserTypeModalOpen, setIsChooseUserTypeModalOpen] = useState(false); // Stav pre ChooseUserTypeModal
    const [personalData, setPersonalData] = useState(null); // Uloženie osobných údajov

    // Otvárače a zatvárače pre login modal
    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    // Otvárače a zatvárače pre register modal
    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    // Otvárače a zatvárače pre ChooseUserTypeModal
    const openChooseUserTypeModal = () => {
        setIsChooseUserTypeModalOpen(true);
    };

    const closeChooseUserTypeModal = () => {
        setIsChooseUserTypeModalOpen(false);
    };

    // Funkcia, ktorá sa zavolá po úspešnej registrácii a otvorí ChooseUserTypeModal
    const handleRegisterSuccess = (userData) => {
        setPersonalData(userData); // Uložiť osobné údaje
        closeRegisterModal(); // Zatvoriť register modal
        openChooseUserTypeModal(); // Otvoriť ChooseUserTypeModal
    };

    return (
        <div className="bg-customDark min-h-screen">
            <div className="w-full bg-customDark">
                <div className="max-w-screen-lg mx-auto px-4">
                    <Header onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />
                </div>
            </div>

            <div className="w-full bg-customDark">
                <div className="max-w-screen-lg mx-auto px-4">
                    <Hero />
                </div>
            </div>

            <div className="w-full bg-purple-700">
                <div className="max-w-screen-lg mx-auto px-4">
                    <HowItWorks />
                </div>
            </div>

            <div className="w-full bg-purple-600">
                <div className="max-w-screen-lg mx-auto px-4">
                    <BecomePart />
                </div>
            </div>

            <div className="w-full bg-customDark">
                <div className="max-w-screen-lg mx-auto px-4">
                    <Footer />
                </div>
            </div>

            {/* Login modal */}
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

            {/* Register modal */}
            <RegisterModal 
                isOpen={isRegisterModalOpen} 
                onClose={closeRegisterModal} 
                onRegisterSuccess={handleRegisterSuccess} // Posielame callback pre úspešnú registráciu
            />

            {/* ChooseUserTypeModal */}
            <ChooseUserTypeModal 
                isOpen={isChooseUserTypeModalOpen} 
                onClose={closeChooseUserTypeModal} 
                userData={personalData}  // Posielame uložené osobné údaje
            />
        </div>
    );
}

export default Hlavnastranka;