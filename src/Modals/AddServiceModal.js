import React, { useState } from 'react';
import Modal from './Modal';
import { useService } from '../Context/ServiceContext';

const AddServiceModal = ({ setIsOpen, defaultCity, defaultCemeteryId }) => {
    const { addService, cemeteriesData } = useService();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        id_cemetery: defaultCemeteryId || '',
        city: defaultCity || ''
    });

    // Unikátne mestá
    const cities = [...new Set(cemeteriesData.map((c) => c.city))];

    // Cintoríny podľa vybraného mesta
    const cemeteriesByCity = cemeteriesData.filter((c) => c.city === formData.city);

    const handleSubmit = () => {
        if (formData.name.trim() === '' || formData.description.trim() === '' || formData.price.trim() === '') {
            return;
        }

        const newService = {
            id: Date.now(),
            entrepreneurId: 2,
            ...formData,
        };
        addService(newService);
        setIsOpen(false);
    };

    return (
        <Modal title="Pridať Službu" setIsOpen={setIsOpen}>
            <select
                name="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value, id_cemetery: '' })}
                className="w-full p-2 mb-2 border rounded bg-purple-50"
            >
                <option value="">Vyberte mesto</option>
                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>

            <select
                name="id_cemetery"
                value={formData.id_cemetery}
                onChange={(e) => setFormData({ ...formData, id_cemetery: parseInt(e.target.value) })}
                className="w-full p-2 border mb-2 rounded bg-purple-100"
                disabled={!formData.city}
            >
                <option value="">Vyberte cintorín</option>
                {cemeteriesByCity.map((cemetery) => (
                    <option key={cemetery.id} value={cemetery.id}>
                        {cemetery.name}
                    </option>
                ))}
            </select>

            <div className="bg-purple-200 p-2 mb-2 rounded-2xl">
                <input
                    type="text"
                    placeholder="Zadajte názov služby"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 rounded bg-purple-50 outline-none"
                />
            </div>

            <div className='bg-purple-200 p-2 mb-2 rounded-2xl'>
                <textarea
                    placeholder="Zadajte popis služby"
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-2 rounded outline-none"
                ></textarea>
            </div>

            <div className="bg-purple-200 p-2 mb-2 rounded-2xl">
                <input
                    type="text"
                    placeholder="Zadajte cenu služby"
                    name="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2 rounded bg-purple-50 outline-none"
                />
            </div>



            <div className="flex justify-between">
                <button
                    onClick={handleSubmit}
                    className="bg-purple-600 text-white px-4 py-2 rounded-3xl hover:bg-purple-700 transition duration-200"
                >
                    Pridať
                </button>
                <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-3xl hover:bg-gray-600 transition duration-200"
                >
                    Zrušiť
                </button>
            </div>
        </Modal>
    );
};

export default AddServiceModal;
