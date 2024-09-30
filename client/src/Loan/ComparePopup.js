import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaPercentage, FaMoneyBillWave, FaCalendarAlt, FaShieldAlt, FaCalculator } from 'react-icons/fa';
import axios from 'axios';

function ComparePopup({ onClose }) {
  const [banks, setBanks] = useState([]);
  const [selectedBank1, setSelectedBank1] = useState(null);
  const [selectedBank2, setSelectedBank2] = useState(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/banks/list');
        setBanks(response.data);
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

  const calculateEMI = (principal, interestRate, tenureMonths) => {
    if (!principal || !interestRate || !tenureMonths) return '-';
    
    const monthlyInterestRate = interestRate / (12 * 100); // Annual rate to monthly and percentage to decimal
    const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, tenureMonths) - 1;
    
    return (numerator / denominator).toFixed(2); // EMI rounded to 2 decimal places
  };

  const renderComparisonRow = (label, icon, bank1Value, bank2Value) => {
    const isDifferent = bank1Value !== bank2Value;
    return (
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="font-semibold flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </div>
        <div className={`border p-2 ${isDifferent && 'bg-yellow-100'}`}>{bank1Value || '-'}</div>
        <div className={`border p-2 ${isDifferent && 'bg-yellow-100'}`}>{bank2Value || '-'}</div>
      </div>
    );
  };

  // Calculate EMIs for both banks
  const emiBank1 = selectedBank1
    ? calculateEMI(selectedBank1.maxLoan, selectedBank1.interestRate, selectedBank1.repaymentPeriod)
    : '-';
  const emiBank2 = selectedBank2
    ? calculateEMI(selectedBank2.maxLoan, selectedBank2.interestRate, selectedBank2.repaymentPeriod)
    : '-';

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
        </div>

        {/* Comparison rows with icons */}
        {renderComparisonRow('Repayment Period', <FaCalendarAlt />, selectedBank1?.repaymentPeriod, selectedBank2?.repaymentPeriod)}
        {renderComparisonRow('Interest Rate', <FaPercentage />, selectedBank1?.interestRate + '%', selectedBank2?.interestRate + '%')}
        {renderComparisonRow('Maximum Loan', <FaMoneyBillWave />, `Rs. ${selectedBank1?.maxLoan?.toLocaleString()}`, `Rs. ${selectedBank2?.maxLoan?.toLocaleString()}`)}
        {renderComparisonRow('EMI', <FaCalculator />, `Rs. ${emiBank1}`, `Rs. ${emiBank2}`)}
        {renderComparisonRow('Securities', <FaShieldAlt />, selectedBank1?.securities, selectedBank2?.securities)}

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

export default ComparePopup;
