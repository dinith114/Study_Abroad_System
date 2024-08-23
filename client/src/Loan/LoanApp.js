import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalculator, FaSpinner, FaTimes, FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import BankCard from './BankCard';
import BOC from '../Images/boc.png';
import HNB from "../Images/hnb.png";
import dfcc from "../Images/dfcc.jpg";
import peoples from "../Images/peoples.png";
import seylan from "../Images/seylan.jpg";
import nsb from "../Images/nsb.png";
import panasia from "../Images/panasia.jpg";
import sampath from "../Images/sampath.jpg";
import PageTitle from '../Components/PageTitle';

function ComparePopup({ onClose }) {
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
  );
}

function LoanApp() {
  const [showComparePopup, setShowComparePopup] = useState(false);

  const navigate = useNavigate();

  // Function to open the popup
  const handleOpenPopup = () => {
    setShowComparePopup(true);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setShowComparePopup(false);
  };

  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate()).toISOString().split('T')[0];

  // State to manage the form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    nic: '',
    university: '',
    program: '',
    programFee: '',
    scholarshipAmount: '',
    totalLoanAmount: '',
    selectedBank: ''
  });

  // Loading states for each button
  const [isLoadingApply, setIsLoadingApply] = useState(false);
  const [isLoadingCompareBanks, setIsLoadingCompareBanks] = useState(false);
  const [isLoadingAdditionalInfo, setIsLoadingAdditionalInfo] = useState(false);
  const [isLoadingUploadDocuments, setIsLoadingUploadDocuments] = useState(false);

  // State to manage the selected bank
  const [selectedBank, setSelectedBank] = useState(null);

  const banks = [
    { bankName: "Bank of Ceylon", rank: "2", logo: BOC },
    { bankName: "HNB Bank", rank: "2", logo: HNB },
    { bankName: "DFCC Bank", rank: "2", logo: dfcc },
    { bankName: "Peoples Bank", rank: "2", logo: peoples },
    { bankName: "Seylan Bank", rank: "2", logo: seylan },
    { bankName: "NSB Bank", rank: "2", logo: nsb },
    { bankName: "Pan Asia Bank", rank: "2", logo: panasia },
    { bankName: "Sampath Bank", rank: "2", logo: sampath },
  ];

  // University and program data with fees
  const universityPrograms = {
    'University of Colombo': {
      'Computer Science': 1000000,
      'Business Management': 1200000,
      'Engineering': 1500000,
    },
    'University of Peradeniya': {
      'Medicine': 2000000,
      'Agriculture': 1100000,
      'Law': 1300000,
    },
    'University of Moratuwa': {
      'Information Technology': 1400000,
      'Architecture': 1600000,
      'Civil Engineering': 1700000,
    },
  };

  // Dynamic Loan Calculation
  useEffect(() => {
    const programFee = parseFloat(formData.programFee) || 0;
    const scholarshipAmount = parseFloat(formData.scholarshipAmount) || 0;
    const loanAmount = programFee - scholarshipAmount;
    setFormData((prevData) => ({ ...prevData, totalLoanAmount: loanAmount }));
  }, [formData.programFee, formData.scholarshipAmount]);

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle university change
  const handleUniversityChange = (e) => {
    const university = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      university: university,
      program: '',
      programFee: ''
    }));
  };

  // Handle program change
  const handleProgramChange = (e) => {
    const program = e.target.value;
    const programFee = universityPrograms[formData.university][program];
    setFormData((prevData) => ({
      ...prevData,
      program: program,
      programFee: programFee.toString()
    }));
  };

  // Simulate delay function
  const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Handlers for each button
  const handleApplyLoan = async () => {
    setIsLoadingApply(true);
    await simulateDelay(2000);
    setIsLoadingApply(false);
    // Add logic to apply for the loan
  };

  const handleCompareBanks = async () => {
    setIsLoadingCompareBanks(true);
    await simulateDelay(2000);
    setIsLoadingCompareBanks(false);
    // Add logic to compare banks
    handleOpenPopup();
  };

  const handleAdditionalInfo = async () => {
    setIsLoadingAdditionalInfo(true);
    await simulateDelay(2000);
    setIsLoadingAdditionalInfo(false);
    // Add logic to show additional info
  };

  const handleUploadDocuments = async () => {
    setIsLoadingUploadDocuments(true);
    await simulateDelay(2000);
    setIsLoadingUploadDocuments(false);
    // Add logic to upload documents
  };

  // Handler for document upload
  const handleFileUpload = (event) => {
    const files = event.target.files;
    setIsLoadingUploadDocuments(true);

    // Simulate file upload delay
    setTimeout(() => {
      setIsLoadingUploadDocuments(false);
      alert('Files Uploaded Successfully');
    }, 2000);

    // Here you can handle the uploaded files, e.g., send them to a server
    console.log(files);
  };

  const handleCancel = () => {
    navigate('/loan-app-list'); // Navigate back to the banks list page or a specific route
  };

  return (
    <>
      <PageTitle title="Student Loan Application" />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Student Information</h2>
            <form>
              <div className="mb-5">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                  placeholder="Enter your last name"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                  Address
                </label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                  placeholder="Enter your address"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  max={maxDate}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="nic" className="block mb-2 text-sm font-medium text-gray-900">
                  NIC
                </label>
                <input
                  type="text"
                  id="nic"
                  value={formData.nic}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                  placeholder="Enter your NIC"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="university" className="block mb-2 text-sm font-medium text-gray-900">
                  University
                </label>
                <select
                  id="university"
                  value={formData.university}
                  onChange={handleUniversityChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                >
                  <option value="">Select a University</option>
                  {Object.keys(universityPrograms).map((university) => (
                    <option key={university} value={university}>{university}</option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <label htmlFor="program" className="block mb-2 text-sm font-medium text-gray-900">
                  Program
                </label>
                <select
                  id="program"
                  value={formData.program}
                  onChange={handleProgramChange}
                  disabled={!formData.university}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                >
                  <option value="">Select a Program</option>
                  {formData.university &&
                    Object.keys(universityPrograms[formData.university]).map((program) => (
                      <option key={program} value={program}>{program}</option>
                    ))}
                </select>
              </div>
              <div className="mb-5">
                <label htmlFor="programFee" className="block mb-2 text-sm font-medium text-gray-900">
                  Total Program Fee (LKR)
                </label>
                <input
                  type="number"
                  id="programFee"
                  value={formData.programFee}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="scholarshipAmount" className="block mb-2 text-sm font-medium text-gray-900">
                  Scholarship Amount (LKR)
                </label>
                <input
                  type="number"
                  id="scholarshipAmount"
                  value={formData.scholarshipAmount}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                  placeholder="Enter scholarship amount"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="totalLoanAmount" className="block mb-2 text-sm font-medium text-gray-900">
                  Total Loan Amount (LKR)
                </label>
                <input
                  type="number"
                  id="totalLoanAmount"
                  value={formData.totalLoanAmount}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="selectedBank" className="block mb-2 text-sm font-medium text-gray-900">
                  Selected Bank
                </label>
                <input
                  type="text"
                  id="selectedBank"
                  value={selectedBank || ''}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                />
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Select a Bank</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banks.map((bank, index) => (
                <BankCard
                  key={index}
                  bankName={bank.bankName}
                  rank={bank.rank}
                  logo={bank.logo}
                  isSelected={selectedBank === bank.bankName}
                  onClick={() => {
                    setSelectedBank(bank.bankName);
                    setFormData((prevData) => ({ ...prevData, selectedBank: bank.bankName }));
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className='flex justify-center'>
            <button
              onClick={handleApplyLoan}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 flex items-center justify-center w-52"
            >
              {isLoadingApply ? <FaSpinner className="animate-spin mr-2" /> : <FaCalculator className="mr-2" />}
              Apply Loan
            </button>
          </div>
          <div className='flex justify-center'>
            <button
              onClick={handleCompareBanks}
              className="bg-green-500 w-52 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 flex items-center justify-center"
            >
              {isLoadingCompareBanks ? <FaSpinner className="animate-spin mr-2" /> : <FaSearch className="mr-2" />}
              Compare Banks
            </button>
          </div>
          <div className='flex justify-center'>
            <label className="cursor-pointer w-52 inline-flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300">
              <FaUpload className="mr-2" />
              <span>Upload Documents</span>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {isLoadingUploadDocuments && (
              <div className="mt-2 text-blue-500">
                <FaSpinner className="animate-spin inline-block mr-2" />
                Uploading...
              </div>
            )}
          </div>
          <div className='flex justify-center'>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex justify-center w-52"
            >
              <AiOutlineClose className="mr-2" />
              Cancel
            </button>
          </div>
        </div>

        {showComparePopup && <ComparePopup onClose={handleClosePopup} />}
      </div>
    </>
  );
}

export default LoanApp;
