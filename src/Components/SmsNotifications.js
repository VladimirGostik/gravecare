import React from 'react';

const SmsNotifications = ({ enabled, toggle }) => {
  return (
    <div className="bg-customSideBar p-4 mb-4 rounded-2xl">
      <label className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={enabled}
          onChange={toggle}
          className="form-checkbox h-5 w-5 text-purple-600"
        />
        <span className="text-xl">Zapnúť SMS notifikácie</span>
      </label>
    </div>
  );
};

export default SmsNotifications;
