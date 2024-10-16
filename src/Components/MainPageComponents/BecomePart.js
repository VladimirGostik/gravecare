import React from 'react';

const BecomePart = () => {
    return (
        <section className="bg-purple-600 text-white py-16 px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Staňte sa súčasťou Gravecare</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-4 bg-purple-800 rounded">
                    <h3 className="text-xl font-bold">Zvýšte svoje príjmy</h3>
                    <p>Získajte nových zákazníkov a zvýšte svoje príjmy prostredníctvom našej platformy.</p>
                </div>
                <div className="p-4 bg-purple-800 rounded">
                    <h3 className="text-xl font-bold">Hodnotenia a recenzie</h3>
                    <p>Získajte recenzie, ktoré vám pomôžu budovať dôveru u nových zákazníkov.</p>
                </div>
                <div className="p-4 bg-purple-800 rounded">
                    <h3 className="text-xl font-bold">Jednoduchá správa objednávok</h3>
                    <p>Spravujte objednávky a platby jednoducho pomocou našej platformy.</p>
                </div>
            </div>
        </section>
    );
};

export default BecomePart;
