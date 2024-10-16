import React, { useState, useEffect } from 'react';
import UserLayout from '../Layouts/UserLayout';
import TabNavigation from '../Components/User/TabNavigation';
import OrdersWaiting from '../Components/User/OrdersWaiting';
import OrdersPending from '../Components/User/OrdersPending';
import OrdersNotReviewed from '../Components/User/OrdersNotReviewed';
import OrdersCompleted from '../Components/User/OrdersCompleted';

const OrdersCustomer = () => {

    const [view, setView] = useState('list'); // 'calendar' alebo 'list'


    return (
        <div>
            <UserLayout />
            <div className='min-h-screen w-[90%] bg-backroundPurple mx-auto rounded-[50px] p-4 mt-4'>
                <TabNavigation view={view} setView={setView}/>
                    {view === 'live' ? (
                        <div>
                            <OrdersWaiting />
                            <OrdersPending />
                        </div>
                    ) : (
                        <div>
                            <OrdersNotReviewed />
                            <OrdersCompleted />
                        </div>
                    )}
            </div>
        </div>
    );
};

export default OrdersCustomer;
