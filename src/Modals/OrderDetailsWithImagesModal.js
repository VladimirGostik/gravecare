import React, { useState, useRef } from 'react';

const OrderDetailsWithImagesModal = ({ order, onClose }) => {
    const [beforeImage, setBeforeImage] = useState(null);
    const [afterImage, setAfterImage] = useState(null);
    const [beforeImageName, setBeforeImageName] = useState('');
    const [afterImageName, setAfterImageName] = useState('');

    const beforeImageInputRef = useRef(null); // Reference for "Fotka pred"
    const afterImageInputRef = useRef(null);  // Reference for "Fotka po"

    const handleBeforeImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBeforeImage(URL.createObjectURL(file));
            setBeforeImageName(file.name);
        }
    };

    const handleAfterImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAfterImage(URL.createObjectURL(file));
            setAfterImageName(file.name);
        }
    };

    const truncateFileName = (name) => {
        if (name.length > 20) {
            return name.substring(0, 17) + '...';
        }
        return name;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sk-SK', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="fixed inset-0 bg-black z-50 backdrop-filter backdrop-blur-sm bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-3 rounded-[30px] shadow-sm w-full max-w-2xl relative">
                <button onClick={onClose} className="absolute top-3 right-5 text-gray-600">
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">Detail objednávky č. {order.id}</h2>

                <div className="flex justify-between">

                    <div className="w-[58%] flex flex-col items-center">
                        <div className="flex justify-between mb-3 w-full">
                            {/* Fotka pred */}
                            <div className="w-[45%]">
                                <label className="block mb-2 text-lg font-bold">Fotka pred:</label>
                                <label className="block cursor-pointer" onClick={() => beforeImageInputRef.current.click()}>
                                    <div className="flex justify-center mb-3">
                                        {beforeImage ? (
                                            <img src={beforeImage} alt="Fotka pred" className="w-30 h-auto rounded-lg shadow-lg" />
                                        ) : (
                                            <div className="text-center border-[3px] p-6 rounded-2xl">
                                                <img src="/images/gallery.png" alt="Žiadna fotka" className="w-20 h-20 mx-auto" />
                                                <p className="text-gray-500">Nebola pridaná žiadna fotka</p>
                                            </div>
                                        )}
                                    </div>
                                    {beforeImageName && <p className="text-sm text-gray-600">{truncateFileName(beforeImageName)}</p>}
                                    <input
                                        type="file"
                                        ref={beforeImageInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleBeforeImageChange}
                                    />
                                </label>
                            </div>

                            {/* Fotka po */}
                            <div className="w-[45%]">
                                <label className="block mb-2 text-lg font-bold">Fotka po:</label>
                                <label className="block cursor-pointer" onClick={() => afterImageInputRef.current.click()}>
                                    <div className="flex justify-center mb-3">
                                        {afterImage ? (
                                            <img src={afterImage} alt="Fotka po" className="w-30 h-auto rounded-lg shadow-lg" />
                                        ) : (
                                            <div className="text-center border-[3px] p-6 rounded-2xl">
                                                <img src="/images/gallery.png" alt="Žiadna fotka" className="w-20 h-20 mx-auto" />
                                                <p className="text-gray-500">Nebola pridaná žiadna fotka</p>
                                            </div>
                                        )}
                                    </div>
                                    {afterImageName && <p className="text-sm text-gray-600">{truncateFileName(afterImageName)}</p>}
                                    <input
                                        type="file"
                                        ref={afterImageInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleAfterImageChange}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Dátum dokončenia */}
                        <p><strong>Dátum dokončenia:</strong></p>
                        <div className="bg-customSideBar rounded-xl w-full p-4 text-center">
                            {formatDate(order.dateCompleted)}
                        </div>

                        {/* Tlačidlo Odoslať */}
                        <div className="flex justify-center mt-6 space-x-6">
                            <button className="bg-customPurple text-white px-8 py-2 rounded-xl text-lg hover:bg-customSideBar">Dokončiť a Odoslať</button>
                        </div>
                    </div>

                    {/* Ľavá strana s detailmi objednávky */}
                    <div className="bg-backroundPurple p-3 rounded-2xl w-[40%]">
                        <p className="mx-2"><strong>Meno zákazníka:</strong></p>
                        <div className="bg-customSideBar rounded-xl w-full p-1 px-2">{order.customerName}</div>
                        <p className="mx-2 mt-2"><strong>Adresa:</strong></p>
                        <div className="bg-customSideBar rounded-xl w-full p-1 px-2">{order.address}</div>
                        <p className="mx-2 mt-2"><strong>Detailný popis:</strong></p>
                        <div className="bg-customSideBar rounded-xl w-full p-1 px-2">{order.description}</div>
                        <p className="mx-2 mt-2"><strong>Vybrané služby:</strong></p>
                        <div className="bg-customSideBar rounded-xl w-full p-2">
                            <ul className="list-disc pl-5">
                                {order.selectedServices.map((service, index) => (
                                    <li key={index}>{service}</li>
                                ))}
                            </ul>
                            <p className="font-bold text-lg mt-4">Celkom: {order.totalPrice} €</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OrderDetailsWithImagesModal;
