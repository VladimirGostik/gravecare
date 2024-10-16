import React from 'react';

const ViewToggle = ({ view, setView }) => {
    return (
        <div className='flex justify-end items-center p-2'>
            <div className="inline-flex">
                <button
                    className={`w-14 h-11 pl-2 rounded-l-full ${view === 'calendar' ? 'bg-white' : 'bg-gray-400'}`}
                    onClick={() => setView('calendar')}
                >
                    <img
                        src="/images/calendar-view.png"
                        alt="Calendar View"
                        className="w-10 h-10 mb-1"
                    />
                </button>

                <button
                    className={`w-12 h-11 ml-0 pl-2 rounded-r-full ${view === 'list' ? 'bg-white' : 'bg-gray-400'}`}
                    onClick={() => setView('list')}
                >
                    <img
                        src="/images/list-view.png"
                        alt="List View"
                        className="w-7 h-7"
                    />
                </button>
            </div>
        </div>
    );
};

export default ViewToggle;
