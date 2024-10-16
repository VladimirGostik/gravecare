import React from 'react';

const EmailNotifications = ({ enabled, toggle }) => {
  return (
    <div className="bg-customSideBar p-4 mb-4 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-2">Notifikácie</h2>
      <label className="flex items-center space-x-3 mb-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={toggle}
          className="form-checkbox h-5 w-5 text-purple-600"
        />
        <span className="text-xl">Zapnúť emailové notifikácie</span>
      </label>
    </div>
  );
};

export default EmailNotifications;
