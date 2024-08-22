import React from 'react';

function BankCard({ bankName, rank, logo, isSelected, onClick }) {
  return (
    <div
      className={`border border-gray-200 rounded-3xl p-4 text-center shadow-sm cursor-pointer ${isSelected ? 'bg-blue-100' : ''}`}
      onClick={onClick}
    >
      <img src={logo} alt={`${bankName} logo`} className="h-16 mx-auto mb-4" />
      <h3 className="font-medium text-lg">{bankName}</h3>
      <p className="text-sm text-gray-600">Rank - {rank}</p>
      <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
        View
      </button>
    </div>
  );
}

export default BankCard;
