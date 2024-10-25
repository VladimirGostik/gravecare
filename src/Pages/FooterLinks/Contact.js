import React from 'react';
import Footer from '../../Components/Footer';

const Contact = () => {
    return (
        <Footer>
            <section className=" min-h-screen py-16 px-8 text-gray-900 text-center">
                <h1 className="text-4xl font-bold text-white mb-8">Kontaktujte nás</h1>
                <p className="max-w-screen-md mx-auto text-lg text-white leading-relaxed">
                    Ak máte akékoľvek otázky alebo potrebujete pomoc, neváhajte nás kontaktovať na email info@gravecare.sk alebo
                    na telefónnom čísle +421 123 456 789. Radi vám pomôžeme.
                </p>
            </section>
        </Footer>
    );
};

export default Contact;
