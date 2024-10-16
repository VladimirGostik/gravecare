// CompanyDescription.js
import React from 'react';

const CompanyDescription = ({ personalData }) => {
  return (
    <div className="p-4 bg-customPurpleNavbar rounded-2xl">
      <h2 className="text-xl font-bold text-white mb-2">Kontaktné údaje:</h2>
      <div className="text-white mb-2 ml-2">
        <span className="font-bold">Email:</span> {personalData.email}
      </div>
      <div className="text-white ml-2">
        <span className="font-bold">Telefón:</span> {personalData.phoneNumber}
      </div>
    </div>
  );
};

export default CompanyDescription;
