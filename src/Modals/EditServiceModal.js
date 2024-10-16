import React, { useState } from 'react';
import Modal from './Modal';
import { useService } from '../Context/ServiceContext';

const EditServiceModal = ({ setIsOpen, service }) => {
  const { editService, deleteService, cemeteriesData } = useService();
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    price: service.price,
    id_cemetery: service.id_cemetery,
  });

  const cemetery = cemeteriesData.find((c) => c.id === service.id_cemetery);
  const city = cemetery ? cemetery.city : '';

  const handleUpdate = () => {
    const updatedService = { ...service, ...formData };
    editService(updatedService);
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm('Naozaj chcete vymazať túto službu?')) {
      deleteService(service.id);
      setIsOpen(false);
    }
  };

  return (
    <Modal title="Upraviť Službu" setIsOpen={setIsOpen}>
      <div className="bg-purple-100 p-2 mb-2 rounded-xl shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Názov služby:</label>
        <input
          type="text"
          placeholder="Názov služby"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 border rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      <div className="bg-purple-100 p-2 mb-2 rounded-xl shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Popis služby:</label>
        <textarea
          placeholder="Popis služby"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-3 border rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
        ></textarea>
      </div>

      <div className="bg-purple-100 p-2 mb-2 rounded-xl shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Cena:</label>
        <input
          type="text"
          placeholder="Cena"
          name="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full p-3 border rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-200"
        >
          Vymazať
        </button>
        <button
          onClick={handleUpdate}
          className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-600 transition duration-200"
        >
          Uložiť zmeny
        </button>
      </div>
    </Modal>
  );
};

export default EditServiceModal;