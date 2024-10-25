import React from 'react';
import { FaClipboardCheck, FaCreditCard, FaHourglassHalf, FaStar } from 'react-icons/fa';

const steps = [
    {
        title: "Zadanie objednávky",
        description: "Zadajte objednávku s presnými informáciami o mieste, kde sa nachádza hrob. Môžete pridať aj fotografiu hrobu pre lepšiu identifikáciu.",
        icon: <FaClipboardCheck size={50} className="text-green-400 mb-4" />,
    },
    {
        title: "Potvrdenie a Platba",
        description: "Po potvrdení objednávky zo strany poskytovateľa uskutočníte platbu. Dostanete e-mail s potvrdením a informáciami o termíne vykonania služby.",
        icon: <FaCreditCard size={50} className="text-blue-500 mb-4" />,
    },
    {
        title: "Čakanie na upratanie",
        description: "Poskytovateľ vykoná službu v dohodnutom termíne.",
        icon: <FaHourglassHalf size={50} className="text-yellow-500 mb-4" />,
    },
    {
        title: "Hodnotenie poskytovateľa",
        description: "Po vykonaní služby ohodnoťte poskytovateľa a jeho prácu. Vaša spätná väzba pomôže ostatným užívateľom pri výbere.",
        icon: <FaStar size={50} className="text-yellow-400 mb-4" />,
    },
];

const HowItWorks2 = () => {

    return (
        <section className="text-white py-16 px-8">
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

export default HowItWorks2;
