// CompanyInfo.js
import React from 'react';
import StarRating from './StarRating'; // Import star rating component

const CompanyInfo = ({ companyData }) => {
  return (
    <div className="w-full p-2">
      {/* Sekcia s logom a informáciami o firme */}
      <div className="flex items-center">
        {/* Logo firmy */}
        <div className="mr-6 w-[30%]">
          <img
            src={companyData.companyLogo || '/images/profile.png'}
            alt="Logo firmy"
            className="w-32 h-32 object-contain rounded-xl"
          />
        </div>

        {/* Názov firmy a hodnotenie */}
        <div className="flex flex-col justify-center w-[70%]">
          <div className="bg-white rounded-xl p-2 w-full">
            <h1 className="text-2xl font-semibold text-gray-800">
              {companyData.companyName}
            </h1>
          </div>

          {/* Hodnotenie hviezdičkami */}
          <span className="text-white mt-2">Priemerné hodnotenie:</span>
          <div className="mt-1 flex items-center">
            <StarRating rating={companyData.averageRating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
