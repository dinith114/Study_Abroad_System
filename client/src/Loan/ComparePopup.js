import React from 'react';
import { FaTimes } from 'react-icons/fa';

function ComparePopup({ onClose }) {
  return (
    <div>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-semibold text-center mb-6">Compare Banks</h2>

        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          {/* Column Headers */}
          <div></div>
          <div className="font-semibold">
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Select Bank 1</option>
              <option>Bank of America</option>
              <option>Chase</option>
              <option>Wells Fargo</option>
              <option>CitiBank</option>
              <option>Capital One</option>
              <option>PNC Bank</option>
              <option>U.S. Bank</option>
              <option>TD Bank</option>
              <option>BB&T</option>
              <option>SunTrust</option>
            </select>
          </div>
          <div className="font-semibold">
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Select Bank 2</option>
              <option>Bank of America</option>
              <option>Chase</option>
              <option>Wells Fargo</option>
              <option>CitiBank</option>
              <option>Capital One</option>
              <option>PNC Bank</option>
              <option>U.S. Bank</option>
              <option>TD Bank</option>
              <option>BB&T</option>
              <option>SunTrust</option>
            </select>
          </div>

          {/* Rows for Comparison */}
          <div className="font-semibold">Repayment Period</div>
          <div className="border p-2">Bank 1 Data</div>
          <div className="border p-2">Bank 2 Data</div>

          <div className="font-semibold">Interest Rate</div>
          <div className="border p-2">Bank 1 Data</div>
          <div className="border p-2">Bank 2 Data</div>

          <div className="font-semibold">Tenure (Months)</div>
          <div className="border p-2">Bank 1 Data</div>
          <div className="border p-2">Bank 2 Data</div>

          <div className="font-semibold">Loan Amount</div>
          <div className="border p-2">Bank 1 Data</div>
          <div className="border p-2">Bank 2 Data</div>

          <div className="font-semibold">Equated Monthly Instalment (EMI)</div>
          <div className="border p-2">Bank 1 EMI</div>
          <div className="border p-2">Bank 2 EMI</div>

          <div className="font-semibold">Securities</div>
          <div className="border p-2">Bank 1 Data</div>
          <div className="border p-2">Bank 2 Data</div>

          <div className="font-semibold">Grace Period</div>
          <div className="border p-2">Bank 1 Data</div>
          <div className="border p-2">Bank 2 Data</div>

          <div className="font-semibold">Minimum Loan</div>
          <div className="border p-2">Bank 1 Data</div>
          <div className="border p-2">Bank 2 Data</div>

          <div className="font-semibold">Maximum Loan</div>
          <div className="border p-2">Bank 1 Data</div>
          <div className="border p-2">Bank 2 Data</div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ComparePopup