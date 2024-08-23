import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineCloudUpload, AiOutlineSave, AiOutlineClose } from 'react-icons/ai';
import PageTitle from '../Components/PageTitle';

function EditBank() {
  const { id } = useParams(); // Get the bank ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [bankName, setBankName] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [rank, setRank] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [maxLoan, setMaxLoan] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('');
  const [purpose, setPurpose] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the bank details using the ID and populate the state
    // Replace with actual data fetching logic
    const fetchBankDetails = async () => {
      const bankData = {
        bankName: 'Sample Bank',
        interestRate: '3.5',
        rank: '2',
        loanAmount: '100000',
        maxLoan: '500000',
        repaymentPeriod: '60',
        purpose: 'Home Loan',
        eligibility: 'Salaried Employee',
        imageUrl: '/path/to/sample/image.jpg'
      };

      setBankName(bankData.bankName);
      setInterestRate(bankData.interestRate);
      setRank(bankData.rank);
      setLoanAmount(bankData.loanAmount);
      setMaxLoan(bankData.maxLoan);
      setRepaymentPeriod(bankData.repaymentPeriod);
      setPurpose(bankData.purpose);
      setEligibility(bankData.eligibility);
      setSelectedImage(bankData.imageUrl);
    };

    fetchBankDetails();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        setError('Please upload a valid image file (JPG or PNG)');
        return;
      }
      if (file.size > 5000000) { // Restrict to 5MB
        setError('File size should not exceed 5MB');
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = () => {
    // Validation
    if (
      !bankName ||
      !interestRate ||
      !rank ||
      !loanAmount ||
      !maxLoan ||
      !repaymentPeriod ||
      !purpose ||
      !eligibility
    ) {
      setError('Please fill out all fields.');
      return;
    }

    if (isNaN(interestRate) || isNaN(rank) || isNaN(loanAmount) || isNaN(maxLoan)) {
      setError('Interest Rate, Rank, Loan Amount, and Maximum Loan should be numbers.');
      return;
    }

    setError('');
    console.log({
      bankName,
      interestRate,
      rank,
      loanAmount,
      maxLoan,
      repaymentPeriod,
      purpose,
      eligibility,
      selectedImage,
    });

    // Submit updated bank details (e.g., send to API)
  };

  const handleReset = () => {
    setBankName('');
    setInterestRate('');
    setRank('');
    setLoanAmount('');
    setMaxLoan('');
    setRepaymentPeriod('');
    setPurpose('');
    setEligibility('');
    setSelectedImage(null);
    setError('');
  };

  const handleCancel = () => {
    navigate('/bank-list'); // Navigate back to the banks list page or a specific route
  };

  return (
    <div className="my-3 p-8 rounded border border-gray-200 max-w-4xl mx-auto mt-10">
      <PageTitle title="Edit Bank Details" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Editing Bank ID: {id}</h1>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-2 gap-6">
        {/* Bank Name */}
        <div className="col-span-2">
          <label className="block text-gray-700">Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Annual Interest Rate */}
        <div>
          <label className="block text-gray-700">Annual interest rate</label>
          <input
            type="text"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Rank */}
        <div>
          <label className="block text-gray-700">Rank</label>
          <input
            type="text"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Select bank icon image */}
        <div className="col-span-2 flex flex-col items-center">
          <label className="block text-gray-700">Select bank icon image</label>
          <div className="flex flex-col items-center mt-2">
            <div className="relative">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Bank Icon"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex justify-center items-center">
                  <AiOutlineCloudUpload size={24} className="text-gray-500" />
                </div>
              )}
            </div>
            <label className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-lg cursor-pointer">
              Upload
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Loan Amount */}
        <div className="col-span-2">
          <label className="block text-gray-700">Loan Amount</label>
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Maximum Loan */}
        <div>
          <label className="block text-gray-700">Maximum Loan</label>
          <input
            type="text"
            value={maxLoan}
            onChange={(e) => setMaxLoan(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Repayment Period */}
        <div>
          <label className="block text-gray-700">Repayment Period</label>
          <input
            type="text"
            value={repaymentPeriod}
            onChange={(e) => setRepaymentPeriod(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
          <span className="text-sm text-gray-500 mt-1 inline-block">Months</span>
        </div>

        {/* Purpose of loan */}
        <div className="col-span-2">
          <label className="block text-gray-700">Purpose of loan</label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Eligibility */}
        <div className="col-span-2">
          <label className="block text-gray-700">Eligibility</label>
          <input
            type="text"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4 flex items-center"
        >
          <AiOutlineSave className="mr-2" />
          Save Changes
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4 flex items-center"
        >
          <AiOutlineClose className="mr-2" />
          Reset
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <AiOutlineClose className="mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditBank;
