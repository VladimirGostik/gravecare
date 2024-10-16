import React from 'react';

const steps = [
    { title: "Registrácia", description: "Vytvorte si účet a spravujte svoj profil.", icon: "📝" },
    { title: "Zadajte miesto", description: "Zaregistrujte vašu lokalitu, aby ste našli najbližších poskytovateľov.", icon: "📍" },
    { title: "Vyhľadávanie poskytovateľov", description: "Prezerajte si poskytovateľov a služby v blízkosti.", icon: "🔍" },
    { title: "Výber poskytovateľa", description: "Vyberte si vhodného poskytovateľa a pošlite objednávku.", icon: "✔️" }
];

const HowItWorks = () => {
    return (
        <section className="bg-purple-700 text-white py-16 px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Ako to funguje?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <div className="text-4xl mb-4">{step.icon}</div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
