import React, { useEffect, useState } from 'react';
import BusinessLayout from '../Layouts/BusinessLayout';
import TabNavigation from '../Components/TabNavigation';
import WaitingOrderItem from '../Components/WaitingOrderItem'; // Nový komponent
import { useOrders } from '../Context/OrderContext'; // Importujeme OrderContext

const CompletedOrders = () => {
    const { fetchWaitingOrders } = useOrders();  // Použijeme funkciu na získanie nevybavených objednávok
    const [CompletedOrders, setCompletedOrders] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(5); // počet objednávok na stránku

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await fetchWaitingOrders(); // Získavame nevybavené objednávky
                setCompletedOrders(orders);
            } catch (error) {
                console.error('Error fetching pending orders:', error);
            }
        };

        fetchOrders();
    }, [fetchWaitingOrders]);

    // Sorting function
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedOrders = [...CompletedOrders].sort((a, b) => {
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

    const totalPages = Math.ceil(CompletedOrders.length / ordersPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleOrdersPerPageChange = (e) => {
        setOrdersPerPage(Number(e.target.value));
        setCurrentPage(1); // reset to first page
    };

    return (
        <BusinessLayout>
            <TabNavigation />
            <div className="flex flex-col min-h-screen w-full bg-backroundPurple mt-2 rounded-[50px] p-6">
                <h1 className="text-xl text-white font-bold flex justify-center p-4 text-shadow-lg text-border">
                    Waiting for review
                </h1>

                <div className="flex justify-between items-center text-white font-bold pl-2">
                    <span
                        className="w-1/6 bg-customPurpleNavbar rounded-3xl mb-4 px-4 p-2 cursor-pointer "
                        onClick={() => handleSort('id')}
                    >
                        Č. o. {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                    </span>
                    <span
                        className="w-1/2 bg-customPurpleNavbar rounded-3xl mb-4 px-4 p-2 cursor-pointer"
                        onClick={() => handleSort('customerName')}
                    >
                        Meno zákazníka {sortConfig.key === 'customerName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                    </span>
                    <span
                        className="w-3/4 bg-customPurpleNavbar rounded-3xl mb-4 px-4 p-2 cursor-pointer"
                        onClick={() => handleSort('address')}
                    >
                        Adresa {sortConfig.key === 'address' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                    </span>
                    <span
                        className="w-1/3 bg-customPurpleNavbar rounded-3xl mb-4 px-4 p-2 cursor-pointer"
                        onClick={() => handleSort('deadline')}
                    >
                        Deadline {sortConfig.key === 'deadline' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                    </span>
                    <span className="w-1/8 bg-customPurpleNavbar rounded-3xl mb-4 px-4 p-2">
                        Detaily
                    </span>
                </div>

                {/* Zoznam objednávok */}
                <div>
                    {currentOrders.length > 0 ? (
                        currentOrders.map((order) => (
                            <WaitingOrderItem key={order.id} order={order} />
                        ))
                    ) : (
                        <p className="text-white text-center mt-10">Nie sú žiadne objednávky na potvrdenie.</p>
                    )}
                </div>


                {/* Stránkovanie a výber počtu objednávok na stránku */}
                <div className="flex justify-between items-center mt-auto px-6">
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
        </BusinessLayout>
    );
};

export default CompletedOrders;
