import React, { useState } from 'react';
import { AiOutlineCloudUpload, AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PageTitle from '../Components/PageTitle';

function AddNewBank() {
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

  const navigate = useNavigate(); // Create navigate function

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
      !eligibility ||
      !selectedImage
    ) {
      setError('Please fill out all fields and upload an image.');
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

    // Clear form (optional)
    handleReset();
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
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="my-3 p-8 rounded border border-gray-200 max-w-4xl mx-auto mt-10">
      {/* Page Title */}
      <PageTitle title="Add new Bank" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bank Details</h1>
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

        {/* Add, Reset, and Cancel Buttons */}
        <div className="flex justify-end col-span-2 space-x-4 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
          >
            <AiOutlinePlus className="w-4 h-4" />
            <span>Add New Bank</span>
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
          >
            <AiOutlineClose className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
          >
            <AiOutlineClose className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewBank;
