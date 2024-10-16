import React from 'react';

const TabNavigation = ({view, setView}) => {

  return (
    <div className="flex justify-center space-x-4 mb-2">
        <button
          className={`rounded-full px-4 py-2 ${view === 'live' ? 'bg-customSideBar text-black ' : 'bg-customPurpleNavbar text-white' }`}
          onClick={() => setView('live')}
        >
          Potvrdenie objednávky
        </button>

        <button
         className={`rounded-full px-4 py-2 ${view === 'past' ? 'bg-customSideBar text-black ' : 'bg-customPurpleNavbar text-white' }`}
         onClick={() => setView('past')}
        >
          Nevybavené objednávky
        </button>
    </div>
    
  )
}

export default TabNavigation
