import React from 'react';
import FooterLayout from '../../Layouts/FooterLayout';

const Services = () => {
    return (
        <FooterLayout>
            <section className=" min-h-screen py-16 px-8 text-gray-900 text-center">
                <h1 className="text-4xl font-bold text-white mb-8">Poskytované Služby</h1>
                <p className="max-w-screen-md mx-auto text-white text-lg leading-relaxed">
                    Ponúkame širokú škálu služieb zameraných na údržbu a úpravu hrobov vrátane čistenia, údržby kvetinovej výzdoby,
                    náhrobného osvetlenia a pravidelnej úpravy. Naši profesionáli sú pripravení postarať sa o hroby tak,
                    aby vždy vyzerali dôstojne.
                </p>
            </section>
        </FooterLayout>
    );
};

export default Services;
