import React from 'react';
import { Header } from '../Components/MainPageComponents';
import Footer from '../Components/Footer';

const FooterLayout = ({ children }) => {
    return (
        <div>
            {/* Navbar */}
            <Header />
            <div className="bg-customDark w-full mx-auto pr-4">
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default FooterLayout;
