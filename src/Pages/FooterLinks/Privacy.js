import React from 'react';
import FooterLayout from '../../Layouts/FooterLayout';

const Privacy = () => {
    return (
        <FooterLayout>
            <section className="min-h-screen py-16 px-8 text-gray-900 text-center">
                <h1 className="text-4xl font-bold text-white mb-8">Ochrana Súkromia</h1>
                <p className="max-w-screen-md mx-auto text-white text-lg leading-relaxed">
                    Vaše súkromie je pre nás dôležité. Prečítajte si, akým spôsobom zhromažďujeme, uchovávame a používame vaše údaje
                    pri používaní platformy Gravecare.
                </p>
            </section>
        </FooterLayout>
    );
};

export default Privacy;
