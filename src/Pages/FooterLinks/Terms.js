import React from 'react';
import FooterLayout from '../../Layouts/FooterLayout';

const Terms = () => {
    return (
        <FooterLayout>
            <section className=" min-h-screen py-16 px-8 text-gray-900 text-center">
                <h1 className="text-4xl text-white font-bold mb-8">Podmienky Používania</h1>
                <p className="max-w-screen-md mx-auto text-white text-lg leading-relaxed">
                    Tu nájdete všetky informácie o podmienkach používania našej platformy. Prosím, prečítajte si ich pozorne, aby ste
                    porozumeli vašim právam a povinnostiam pri využívaní Gravecare.
                </p>
            </section>
        </FooterLayout>
    );
};

export default Terms;
