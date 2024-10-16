import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating'; // StarRating component

const EntrepreneurCard = ({ entrepreneur }) => {
  const { companyName, averageRating, companyLogo, id, description } = entrepreneur;

  // Skrátenie popisu na 100 znakov
  const truncatedDescription = description?.length > 100 ? `${description.substring(0, 100)}...` : description;

  return (
    <Link to={`/entrepreneur/${id}`} className="block">
      <div className="bg-white p-4 mb-4 rounded-lg shadow-md flex items-center justify-between transform transition-transform duration-300 hover:scale-105 cursor-pointer">
        {/* Logo */}
        <img
          src={companyLogo || '/images/profile.png'}
          alt={companyName}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />

        {/* Informácie o firme a hodnotenie */}
        <div className="flex flex-col justify-center">
          <h4 className="text-xl font-bold">{companyName}</h4>
          <p className="text-sm text-gray-600">Priemerné hodnotenie:</p>
          <StarRating rating={averageRating} />
        </div>

        {/* Popis */}
        <div className="flex flex-col items-start ml-4 w-2/3">
          <p className="text-gray-600 text-sm">{truncatedDescription}</p>
        </div>
      </div>
    </Link>
  );
};

export default EntrepreneurCard;
