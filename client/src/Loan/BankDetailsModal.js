// BankDetailsModal.jsx
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function BankDetailsModal({ bank, onClose }) {
  if (!bank) return null;

  // Ensure each property has a default value if undefined
  const {
    name = 'Unknown Bank',
    logo,
    rank = 'N/A',
    interestRate = 'N/A',
    maxLoan = 0,
    repaymentPeriod = 'N/A',
    eligibility = 'N/A',
    purpose = 'N/A',
  } = bank;
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close"
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Bank name */}
        <h2 className="text-2xl font-bold mb-4">{name}</h2>

        {/* Bank details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Rank:</p>
            <p>{rank}</p>
          </div>
          <div>
            <p className="font-semibold">Interest Rate:</p>
            <p>{interestRate}%</p>
          </div>
          <div>
            <p className="font-semibold">Maximum Loan:</p>
            {/* Use toLocaleString safely by ensuring maxLoan is a number and change $ to Rs. */}
            <p>Rs. {typeof maxLoan === 'number' ? maxLoan.toLocaleString() : maxLoan}</p>
          </div>
          <div>
            <p className="font-semibold">Repayment Period:</p>
            <p>{repaymentPeriod} months</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Eligibility:</p>
            <p>{eligibility}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Purpose:</p>
            <p>{purpose}</p>
          </div>
        </div>

        {/* Logo at the bottom with increased size */}
        {logo && (
          <div className="flex justify-center mt-6">
            <img
              src={logo}
              alt={`Logo of ${name}`}
              className="h-16 mx-auto mb-4" // Increased size
            />
          </div>
        )}

        {/* Done button */}
        <div className="mt-6">
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default BankDetailsModal;