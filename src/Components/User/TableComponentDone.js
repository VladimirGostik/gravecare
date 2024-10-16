import React, { useState } from 'react';
import TableItemDone from './TableItemDone'; // Importujeme nový komponent pre položky tabuľky

const TableComponent = ({ orders, onOrderClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5); // Počet objednávok na stránku

  // Funkcia na triedenie
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortConfig.key) {
      const aKey = a[sortConfig.key];
      const bKey = b[sortConfig.key];
      if (aKey < bKey) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aKey > bKey) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Logika stránkovania
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleOrdersPerPageChange = (e) => {
    setOrdersPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset na prvú stránku
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col m-4">
      {/* Zobrazenie hlavičiek tabuľky s triedením */}
      <div className="flex justify-between items-center text-white font-bold pr-2">
        <span
          className="w-1/3 bg-customPurpleNavbar rounded-3xl mb-4 px-4 p-2 cursor-pointer"
          onClick={() => handleSort('entrepreneurName')}
        >
          Názov poskytovateľa {sortConfig.key === 'entrepreneurName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </span>
        <span
          className="w-1/2 bg-customPurpleNavbar rounded-3xl mb-4 px-4 p-2 cursor-pointer"
          onClick={() => handleSort('address')}
        >
          Adresa {sortConfig.key === 'address' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </span>
        <span
          className="w-1/6 bg-customPurpleNavbar rounded-3xl mb-4 px-4 p-2 cursor-pointer"
          onClick={() => handleSort('dateCompleted')}
        >
          Dátum {sortConfig.key === 'dateCompleted' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </span>
        <span className="w-1/6 bg-customPurpleNavbar rounded-3xl mb-4 px-4 p-2">
          Akcie
        </span>
      </div>

      {/* Zoznam objednávok */}
      <div>
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            <TableItemDone key={order.id} order={order} onOrderClick={onOrderClick} />
          ))
        ) : (
          <p className="text-white text-center mt-10">Nie sú žiadne objednávky na potvrdenie.</p>
        )}
      </div>

      {/* Stránkovanie a výber počtu objednávok na stránku */}
      <div className="flex justify-between items-center mt-auto mt-4">
        <div className="flex items-center gap-4">
          <label className="text-white">Počet objednávok na stránku:</label>
          <select
            value={ordersPerPage}
            onChange={handleOrdersPerPageChange}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex gap-4 items-center">
          <button
            className="text-white py-2 rounded"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img
              src="/images/left-arrow.png"
              alt="Predchádzajúca stránka"
              className="w-8 h-8"
            />
          </button>

          <div className="bg-white px-4 py-2 rounded-2xl text-black">
            {currentPage} / {totalPages}
          </div>

          <button
            className="text-white py-2 rounded"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img
              src="/images/arrow-right.png"
              alt="Nasledujúca stránka"
              className="w-8 h-8"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
