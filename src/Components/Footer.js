import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className=" bg-customDark  text-gray-300 py-12 px-8 ">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* O Aplikácii */}
                <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">O Gravecare</h3>
                    <p className="text-gray-400 leading-relaxed">
                        Gravecare je platforma, ktorá spája poskytovateľov služieb s klientmi v oblasti údržby hrobov.
                        Našim cieľom je zabezpečiť čisté a dôstojné miesto odpočinku pre vašich blízkych.
                    </p>
                </div>

                {/* Navigácia */}
                <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Rýchle Odkazy</h3>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-white transition duration-200">O Nás</a></li>
                        <li><a href="/services" className="hover:text-white transition duration-200">Poskytované Služby</a></li>
                        <li><a href="/contact" className="hover:text-white transition duration-200">Kontakt</a></li>
                        <li><a href="/terms" className="hover:text-white transition duration-200">Podmienky Používania</a></li>
                        <li><a href="/privacy" className="hover:text-white transition duration-200">Ochrana Súkromia</a></li>
                    </ul>
                </div>

                {/* Kontaktné Informácie */}
                <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Kontakt</h3>
                    <p className="text-gray-400">E-mail: <a href="mailto:info@gravecare.sk" className="hover:text-white transition duration-200">info@gravecare.sk</a></p>
                    <p className="text-gray-400 mt-2">Telefón: +421 123 456 789</p>
                    <div className="flex justify-center md:justify-start space-x-6 mt-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                            <FaFacebook size={28} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                            <FaInstagram size={28} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                            <FaLinkedin size={28} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Informácie */}
            <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-center text-gray-500">
                <p>© 2024 Gravecare. Všetky práva vyhradené.</p>
            </div>
        </footer>
    );
};

export default Footer;
