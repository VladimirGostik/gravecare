import React from 'react';

const BecomePart = ({ onRegisterClick }) => {
    return (
        <section className=" text-black py-6 px-8 text-center">
            <h2 className="text-4xl font-bold mb-2">Staňte sa súčasťou Gravecare</h2>
            <p className="text-lg mb-2">Zaregistrujte sa ako poskytovateľ služieb ešte dnes!</p>
            <button className="mb-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition" onClick={onRegisterClick}>
                Registrovať sa
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Zvýšte svoje príjmy */}
                <div className="bg-white rounded-lg p-8 shadow-md flex flex-col items-center">
                    <img src="/images/income.png" alt="Zvýšte svoje príjmy" className="mb-6 w-20 h-20" /> {/* Nahraďte cestou k svojmu obrázku */}
                    <h3 className="text-2xl font-bold mb-4">Zvýšte svoje príjmy prístupom k novým zákazníkom</h3>
                    <p className="text-sm text-gray-700">
                        Získajte prístup k širšiemu okruhu zákazníkov, ktorí hľadajú spoľahlivých a profesionálnych poskytovateľov služieb pre údržbu hrobov. 
                        Naša platforma osloví nových klientov, čím zvýšite svoje príjmy a rozšírite svoju podnikateľskú základňu.
                    </p>
                </div>
                {/* Hodnotenia a recenzie */}
                <div className="bg-white rounded-lg p-8 shadow-md flex flex-col items-center">
                    <img src="/images/customer-review.png" alt="Hodnotenia a recenzie" className="mb-6 w-20 h-20" /> {/* Nahraďte cestou k svojmu obrázku */}
                    <h3 className="text-2xl font-bold mb-4">Získajte hodnotenia a recenzie, ktoré vám pomôžu získať viac zákazníkov</h3>
                    <p className="text-sm text-gray-700">
                        Každá dokončená objednávka vám môže priniesť pozitívne hodnotenia a recenzie od spokojných zákazníkov. 
                        Tieto recenzie zvyšujú vašu dôveryhodnosť a pomáhajú prilákať ďalších klientov, ktorí hľadajú kvalitné a spoľahlivé služby.
                    </p>
                </div>
                {/* Jednoduchá správa objednávok */}
                <div className="bg-white rounded-lg p-8 shadow-md flex flex-col items-center">
                    <img src="/images/checklist2.png" alt="Jednoduchá správa objednávok" className="mb-6 w-20 h-20" /> {/* Nahraďte cestou k svojmu obrázku */}
                    <h3 className="text-2xl font-bold mb-4">Jednoduchá správa objednávok a platieb</h3>
                    <p className="text-sm text-gray-700">
                        Naša platforma vám poskytuje jednoduchý a prehľadný nástroj na správu všetkých vašich objednávok a platieb. 
                        Systém je navrhnutý tak, aby vám šetril čas a minimalizoval administratívnu záťaž, čo vám umožní sústrediť sa na poskytovanie kvalitných služieb zákazníkom.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BecomePart;
