import React from 'react';
import { FaUserPlus, FaMapMarkerAlt, FaSearch, FaShoppingCart } from 'react-icons/fa';

const steps = [
    {
        title: "Registrácia",
        description: "Vytvorte si účet na Gravecare a prihláste sa do svojho profilu.",
        icon: <FaUserPlus size={50} className="text-green-400 mb-2" />,
    },
    {
        title: "Zadajte miesto",
        description: "Po registrácii zadajte miesto, kde sa nachádza hrob, ktorý chcete nechať upratať.",
        icon: <FaMapMarkerAlt size={50} className="text-red-500 mb-2" />,
    },
    {
        title: "Vyhľadávanie poskytovateľov",
        description: "Zobrazia sa vám všetci poskytovatelia služieb vo vašej oblasti. Prezrite si ich profily a ponuky služieb.",
        icon: <FaSearch size={50} className="text-blue-500 mb-2" />,
    },
    {
        title: "Výber poskytovateľa",
        description: "Vyberte si poskytovateľa, ktorý vám najviac vyhovuje. Skontrolujte jeho dostupnosť a deadliny pre poskytnutie služby.",
        icon: <FaShoppingCart size={50} className="text-green-500 mb-2" />,
    },
];

const HowItWorks = () => {
    return (
        <section className="text-white py-10  px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Ako To Funguje...?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`bg-purple-800 rounded-lg p-6 flex flex-col items-center text-center shadow-md bg-opacity-70 ${
                            index % 2 !== 0 ? 'translate-y-5 -ml-5' : ''
                        }`}
                        style={{
                            transform: index % 2 !== 0 ? 'translateY(40px)' : 'none',
                            marginLeft: index % 2 !== 0 ? '-60px' : '0px',
                        }}
                    >
                        <h3 className="text-2xl font-bold mb-2">{index + 5}. {step.title}</h3>
                        {step.icon}
                        <p className="text-white text-base">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
