import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function ComparePopup({ onClose }) {
  const [banks, setBanks] = useState([]); // State to store fetched banks
  const [selectedBank1, setSelectedBank1] = useState(null);
  const [selectedBank2, setSelectedBank2] = useState(null);

  // Fetch bank data from the backend when the component mounts
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/banks/list');
        setBanks(response.data); // Assuming response.data contains the list of banks
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };

    fetchBanks();
  }, []);

  const handleBankSelect = (event, bankNumber) => {
    const bankId = event.target.value;
    const selectedBank = banks.find(bank => bank._id === bankId);
    
    if (bankNumber === 1) {
      setSelectedBank1(selectedBank);
    } else {
      setSelectedBank2(selectedBank);
    }
  };

  return (
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
            <select 
              className="w-full p-2 border border-gray-300 rounded" 
              onChange={(event) => handleBankSelect(event, 1)}
              value={selectedBank1?._id || ''}
            >
              <option value="">Select Bank 1</option>
              {banks.map((bank) => (
                <option key={bank._id} value={bank._id}>
                  {bank.bankName}
                </option>
              ))}
            </select>
          </div>
          <div className="font-semibold">
            <select 
              className="w-full p-2 border border-gray-300 rounded" 
              onChange={(event) => handleBankSelect(event, 2)}
              value={selectedBank2?._id || ''}
            >
              <option value="">Select Bank 2</option>
              {banks.map((bank) => (
                <option key={bank._id} value={bank._id}>
                  {bank.bankName}
                </option>
              ))}
            </select>
          </div>

          {/* Rows for Comparison */}
          <div className="font-semibold">Repayment Period</div>
          <div className="border p-2">{selectedBank1?.repaymentPeriod || '-'}</div>
          <div className="border p-2">{selectedBank2?.repaymentPeriod || '-'}</div>

          <div className="font-semibold">Interest Rate</div>
          <div className="border p-2">{selectedBank1?.interestRate || '-'}</div>
          <div className="border p-2">{selectedBank2?.interestRate || '-'}</div>

          <div className="font-semibold">Tenure (Months)</div>
          <div className="border p-2">{selectedBank1?.repaymentPeriod || '-'}</div>
          <div className="border p-2">{selectedBank2?.repaymentPeriod || '-'}</div>

          <div className="font-semibold">Max Loan Amount</div>
          <div className="border p-2">{selectedBank1?.maxLoan || '-'}</div>
          <div className="border p-2">{selectedBank2?.maxLoan || '-'}</div>

          <div className="font-semibold">Equated Monthly Instalment (EMI)</div>
          <div className="border p-2">{selectedBank1?.emi || '-'}</div>
          <div className="border p-2">{selectedBank2?.emi || '-'}</div>

          <div className="font-semibold">Securities</div>
          <div className="border p-2">{selectedBank1?.securities || '-'}</div>
          <div className="border p-2">{selectedBank2?.securities || '-'}</div>

          <div className="font-semibold">Grace Period</div>
          <div className="border p-2">{selectedBank1?.gracePeriod || '-'}</div>
          <div className="border p-2">{selectedBank2?.gracePeriod || '-'}</div>

          <div className="font-semibold">Maximum Loan</div>
          <div className="border p-2">{selectedBank1?.maxLoan || '-'}</div>
          <div className="border p-2">{selectedBank2?.maxLoan || '-'}</div>
        </div>
      </div>
    </div>
  );
}

export default ComparePopup;
