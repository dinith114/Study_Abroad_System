import React from 'react';
import { AiOutlineClose, AiOutlineStar, AiOutlinePercentage } from 'react-icons/ai';
import { FaMoneyBillWave, FaClock } from 'react-icons/fa';

function BankDetailsModal({ bank, onClose }) {
  if (!bank) return null;

  // Destructure bank details, setting defaults where necessary
  const {
    bankName = 'Unknown Bank',
    bankIcon,
    rank = 'N/A',
    interestRate = 'N/A',
    maxLoan = 0,
    repaymentPeriod = 'N/A',
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
        <h2 className="text-2xl font-bold mb-4 text-center">{bankName}</h2>

        {/* Bank details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Rank */}
          <div className="flex items-center">
            <AiOutlineStar size={20} className="mr-2 text-yellow-500" />
            <div>
              <p className="font-semibold">Rank:</p>
              <p>{rank}</p>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="flex items-center">
            <AiOutlinePercentage size={20} className="mr-2 text-green-500" />
            <div>
              <p className="font-semibold">Interest Rate:</p>
              <p>{interestRate}%</p>
            </div>
          </div>

          {/* Maximum Loan */}
          <div className="flex items-center">
            <FaMoneyBillWave size={20} className="mr-2 text-blue-500" />
            <div>
              <p className="font-semibold">Maximum Loan:</p>
              <p>Rs. {typeof maxLoan === 'number' ? maxLoan.toLocaleString() : maxLoan}</p>
            </div>
          </div>

          {/* Repayment Period */}
          <div className="flex items-center">
            <FaClock size={20} className="mr-2 text-purple-500" />
            <div>
              <p className="font-semibold">Repayment Period:</p>
              <p>{repaymentPeriod} months</p>
            </div>
          </div>
        </div>

        {/* Bank Icon */}
        {bankIcon && (
          <div className="flex justify-center mt-6">
            <img
              src={`http://localhost:5000${bank.bankIcon}`}
              alt={`bankIcon of ${bankName}`}
              className="h-16 mx-auto mb-4"
            />
          </div>
        )}

        {/* Done button */}
        <div className="mt-6">
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
