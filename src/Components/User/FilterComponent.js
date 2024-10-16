import React, { useState } from 'react';
import Select from 'react-select';

const FilterComponent = ({ filterName, setFilterName, filterService, setFilterService, filterCemetery, setFilterCemetery, cemeteriesData, entrepreneurOptions, serviceOptions }) => {
  // Upravíme mestá a cintoríny do správneho formátu
  const cityOptions = Object.keys(cemeteriesData.reduce((acc, cemetery) => {
    if (!acc[cemetery.city]) {
      acc[cemetery.city] = { label: cemetery.city, options: [] };
    }
    acc[cemetery.city].options.push({ value: cemetery.name, label: cemetery.name });
    return acc;
  }, {})).map(city => ({
    label: city,
    options: cemeteriesData.filter(cemetery => cemetery.city === city).map(cemetery => ({
      value: cemetery.name,
      label: cemetery.name
    }))
  }));

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-6 bg-purple-100 p-4 rounded-lg shadow-md">
      {/* Vyhľadávanie podľa Mesta/Cintorína */}
      <div className="w-full md:w-1/3">
        <Select
          options={cityOptions}
          value={cityOptions.flatMap(group => group.options).find(option => option.value === filterCemetery) || null}
          onChange={(selected) => setFilterCemetery(selected ? selected.value : '')}
          isClearable
          placeholder="Mesto/Cintorín..."
          className="w-full"
        />

      </div>

      {/* Vyhľadávanie podľa Podnikateľa */}
      <div className="w-full md:w-1/3">
        <Select
          options={entrepreneurOptions}
          isMulti
          value={entrepreneurOptions.filter(option => filterName.includes(option.label))}
          onChange={(selected) => setFilterName(selected ? selected.map(s => s.label) : [])}
          placeholder="Poskytovatelia..."
          className="w-full"
        />

      </div>

      {/* Vyhľadávanie podľa Služby */}
      <div className="w-full md:w-1/3">
        <Select
          options={serviceOptions}
          isMulti
          value={serviceOptions.filter(option => filterService.includes(option.value))}
          onChange={(selected) => setFilterService(selected ? selected.map(s => s.value) : [])}
          placeholder="Služby..."
          className="w-full"
        />

      </div>
    </div>
  );
};

export default FilterComponent;
