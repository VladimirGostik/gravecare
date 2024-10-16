import React from 'react';

const InvoiceHistory = ({ invoices }) => {
  return (
    <div className="bg-purple-200 p-6 shadow-lg mb-4 rounded-2xl">
      <h2 className="text-3xl font-bold text-black mb-4 text-center">História faktúr</h2>
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead className="bg-purple-500 text-white">
          <tr>
            <th className="text-left p-3 rounded-tl-lg">Dátum</th>
            <th className="text-left p-3 rounded-tr-lg">Suma</th>
          </tr>
        </thead>
        <tbody>
          {(!invoices || invoices.length === 0) ? (
            <tr>
              <td colSpan="2" className="p-3 text-center text-gray-500 text-lg">
                Žiadne faktúry nie sú k dispozícii
              </td>
            </tr>
          ) : (
            invoices.map((invoice, index) => (
              <tr
                key={invoice.id}
                className={`${
                  index % 2 === 0 ? 'bg-purple-100' : 'bg-purple-200'
                } hover:bg-purple-300 transition-colors duration-200`}
              >
                <td className="p-3 text-gray-700 text-lg">{invoice.date}</td>
                <td className="p-3 text-gray-700 text-lg font-semibold">{invoice.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceHistory;
