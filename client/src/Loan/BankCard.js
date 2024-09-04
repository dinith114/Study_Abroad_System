import React from 'react';

function BankCard({ bankName = 'Unknown Bank', rank = 'N/A', logo, onViewClick }) {
  return (
    <div
      className={`border border-gray-200 rounded-3xl p-4 text-center shadow-sm cursor-pointer`}
      onClick={onViewClick}  // Now the entire card triggers the modal
    >
      <img src={logo} alt={`${bankName} logo`} className="h-16 mx-auto mb-4" />
      <h3 className="font-medium text-lg">{bankName}</h3>
      <p className="text-sm text-gray-600">Rank - {rank}</p>
    </div>
  );
}

export default BankCard;
