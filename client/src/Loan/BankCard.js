import React from 'react';

function BankCard({ bankName = 'Unknown Bank', rank = 'N/A', logo, isSelected, onClick, onViewClick }) {
  return (
    <div
      className={`border border-gray-200 rounded-3xl p-4 text-center shadow-sm cursor-pointer 
        ${isSelected ? 'bg-blue-100 border-blue-500' : ''}`}
      onClick={onClick}
    >
      <img src={logo} alt={`${bankName} logo`} className="h-16 mx-auto mb-4" />
      <h3 className="font-medium text-lg">{bankName}</h3>
      <p className="text-sm text-gray-600">Rank - {rank}</p>
      <button
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
          font-medium rounded-lg text-sm px-4 py-2"
        aria-label={`View details for ${bankName}`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent the card's click event from firing
          onViewClick(); // Open the modal
        }}
      >
        View  
      </button>
    </div>
  );
}

export default BankCard;
