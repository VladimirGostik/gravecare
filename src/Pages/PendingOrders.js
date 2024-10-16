import React, { useEffect, useState } from 'react';
import BusinessLayout from '../Layouts/BusinessLayout';
import TabNavigation from '../Components/TabNavigation';
import WeeklyView from '../Components/WeeklyView'; // Komponent pre zobrazenie týždenného kalendára
import PendingOrderTableView from '../Components/PendingOrderTableView'; // Komponent pre tabuľkové zobrazenie
import ViewToggle from '../Components/ViewToggle'; // Komponent pre prepínanie zobrazenia
import { useOrders } from '../Context/OrderContext'; // Importujeme OrderContext

const PendingOrders = () => {
    const { fetchPendingOrders } = useOrders();  // Použijeme funkciu na získanie nevybavených objednávok
    const [pendingOrders, setPendingOrders] = useState([]);
    const [view, setView] = useState('list'); // 'calendar' alebo 'list'

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await fetchPendingOrders(); // Získavame nevybavené objednávky
                setPendingOrders(orders);
            } catch (error) {
                console.error('Error fetching pending orders:', error);
            }
        };

        fetchOrders();
    }, [fetchPendingOrders]);

    return (
        <BusinessLayout>
            <TabNavigation />

            <div className="flex flex-col w-full max-w-7xl mx-auto mt-2 bg-backroundPurple mt-2 rounded-[50px] p-6 min-h-screen">
            <ViewToggle view={view} setView={setView} />

                {view === 'list' ? (
                    <PendingOrderTableView orders={pendingOrders} />
                ) : (
                    <WeeklyView orders={pendingOrders} />
                )}
            </div>
        </BusinessLayout>
    );
};

export default PendingOrders;