import React, { useState } from 'react';

const OrderDetailsModal = ({ order, onClose }) => {
    // Definujeme funkciu formatDate
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sk-SK', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="fixed inset-0 bg-black z-50 backdrop-filter backdrop-blur-sm bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-3 rounded-[30px] shadow-sm w-full max-w-3xl relative">
                <button onClick={onClose} className="absolute top-3 right-5 text-gray-600">
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">Detail objednávky</h2>

                <div className="flex justify-between">
                    {/* Ľavá strana s podrobnosťami objednávky */}
                    <div className="bg-backroundPurple p-3 rounded-2xl w-[65%]">
                        <p className="mx-2"><strong>Meno dodávateľa:</strong></p>
                        <div className="bg-customSideBar rounded-xl w-full p-1 px-2">{order.entrepreneurName}</div>
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
                            <p className="font-bold text-lg mt-4">Celkom: {order.totalPrice}</p>
                        </div>
                    </div>

                    {/* Pravá strana s obrázkom a dátumom */}
                    <div className="w-[33%] flex flex-col items-center">
                        <p className="mb-2">Fotka pridaná používateľom:</p>
                        <div className="flex justify-center mb-3">
                            {order.beforeImage ? (
                                <img src={order.beforeImage} alt="Fotka pred" className="rounded-lg shadow-lg" />
                            ) : (
                                <div className="text-center border-[3px] p-6 rounded-2xl">
                                    <img src="/images/gallery.png" alt="Žiadna fotka" className="w-20 h-20 mx-auto" />
                                    <p className="text-gray-500">Nebola pridaná žiadna fotka</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-2 bg-customSideBar p-2 rounded-xl w-full shadow-lg">
                            <label className="block text-lg font-bold mb-2 text-center text-gray-700">Dátum vykonávania:</label>
                            <div className="flex justify-center">
                                <div className="w-[80%] px-3 py-2 rounded-lg shadow-sm text-center text-gray-700 bg-white">
                                    {formatDate(order.deadline)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
