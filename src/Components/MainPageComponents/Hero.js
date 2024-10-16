import React from 'react';

const Hero = () => {
    return (
        <section className="bg-customDark text-white py-16 px-8">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
                {/* Textová časť */}
                <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                    <h1 className="text-5xl font-bold mb-8">Nájdite spoľahlivú starostlivosť o hroby ešte dnes!</h1>
                    <p className="text-lg mb-8">
                        Gravecare vám pomáha nájsť profesionálnych poskytovateľov služieb pre údržbu a upratovanie hrobov. Vyhľadajte firmy a jednotlivcov, ktorí zabezpečia, aby hroby vašich blízkych boli vždy v dokonalom stave.
                    </p>
                    {/* Tlačidlo zarovnané doprava */}
                    <div className="flex justify-center lg:justify-end">
                        <button className="px-12 py-3 text-2xl rounded-full text-white bg-customPurple hover:bg-customPurpleHover transition duration-900">
                            Vyhľadať
                        </button>
                    </div>
                </div>
                
                {/* Obrázok */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                    <img src="/images/webDizajn.png" alt="Web dizajn" className="rounded-lg shadow-lg" style={{ width: '500px', height: 'auto' }} />
                </div>
            </div>
        </section>
    );
};

export default Hero;
