import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalculator } from 'react-icons/fa';
import BankCard from './BankCard';
import BOC from '../Images/boc.png';
import HNB from "../Images/hnb.png";
import dfcc from "../Images/dfcc.jpg";
import peoples from "../Images/peoples.png";
import seylan from "../Images/seylan.jpg";
import nsb from "../Images/nsb.png";
import panasia from "../Images/panasia.jpg";
import sampath from "../Images/sampath.jpg";

function LoanApp() {
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
    totalLoanAmount: ''
  });

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

  return (
    <div className="mt-3 p-8 rounded border border-gray-200 lg:mx-40">
      <h1 className="font-medium text-3xl mb-6 text-center bg-blue-100 p-5 rounded-lg text-grNavTextHov">Loan Application</h1>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
          <FaSearch className="w-4 h-4 text-grNavTextHov" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Student"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>

      <form>
        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-x-20">
          {/* Student Information Section */}
          <h2 className="col-span-2 font-medium text-xl mb-4">Student Information</h2>
          <div className="mb-5">
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
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
              placeholder="Enter last name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
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
              placeholder="Enter email address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
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
              placeholder="07X XXX XXXX"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
              pattern="07[0-9]{1} [0-9]{3} [0-9]{4}"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
              Gender
            </label>
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
              max={maxDate} // Restrict to 16 years ago
              placeholder="Select date of birth"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="nic" className="block mb-2 text-sm font-medium text-gray-900">
              National Identity Card (NIC) Number
            </label>
            <input
              type="text"
              id="nic"
              value={formData.nic}
              onChange={handleInputChange}
              placeholder="Enter NIC number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
              pattern="[0-9]{9}[vV]"
            />
          </div>

          {/* Course Information Section */}
          <h2 className="col-span-2 font-medium text-xl my-4">Course Information</h2>
          <div className="mb-5">
            <label htmlFor="university" className="block mb-2 text-sm font-medium text-gray-900">
              University
            </label>
            <input
              type="text"
              id="university"
              value={formData.university}
              onChange={handleInputChange}
              placeholder="Enter university name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="program" className="block mb-2 text-sm font-medium text-gray-900">
              Program
            </label>
            <input
              type="text"
              id="program"
              value={formData.program}
              onChange={handleInputChange}
              placeholder="Enter degree program"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="programFee" className="block mb-2 text-sm font-medium text-gray-900">
              Total Program Fee (LKR)
            </label>
            <input
              type="number"
              id="programFee"
              value={formData.programFee}
              onChange={handleInputChange}
              placeholder="Enter total program fee"
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
              placeholder="Enter scholarship amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>

          {/* Loan Calculation Section */}
          <h2 className="col-span-2 font-medium text-xl my-4">Loan Calculation</h2>
          <div className="mb-5 flex items-center">
            <FaCalculator className="w-6 h-6 text-grNavTextHov mr-3" />
            <label htmlFor="totalLoanAmount" className="block text-sm font-medium text-gray-900">
              Total Loan Amount (LKR)
            </label>
            <input
              type="number"
              id="totalLoanAmount"
              value={formData.totalLoanAmount}
              readOnly
              className="ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5"
            />
          </div>
        </div>

        {/* Compare Banks Button */}
        <div className="flex justify-center my-6">
          <button
            type="button"
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Compare Banks
          </button>
        </div>

        {/* Bank Selection Section */}
        <h2 className="font-medium text-xl my-6">Bank Selection</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {banks.map((bank, index) => (
            <BankCard
              key={index}
              bankName={bank.bankName}
              rank={bank.rank}
              logo={bank.logo}
              isSelected={selectedBank === bank.bankName}
              onClick={() => setSelectedBank(bank.bankName)}
            />
          ))}
        </div>

        {/* Display Selected Bank */}
        {selectedBank && (
          <div className="my-6 p-4 bg-green-100 rounded-lg text-green-800 text-center">
            Selected Bank: {selectedBank}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Additional Information
          </button>
          <button
            type="button"
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Upload Supporting Documents
          </button>
        </div>

        {/* Apply for Loan Button at the Bottom Center */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300"
          >
            Apply for Loan
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoanApp;
