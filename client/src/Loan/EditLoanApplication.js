import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function EditLoanApplication({ studentId, applicationData = {}, onSubmit, onCancel }) {
  const navigate = useNavigate();  // Initialize the navigate function

  const defaultData = {
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
    registrationFees: '',
    totalProgramFee: '',
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    monthlyPayment: '',
    selectedBank: '',
  };

  const [formData, setFormData] = useState({ ...defaultData, ...applicationData });

  useEffect(() => {
    setFormData({ ...defaultData, ...applicationData });
  }, [applicationData]);

  useEffect(() => {
    const calculateMonthlyPayment = () => {
      const principal = parseFloat(formData.loanAmount) || 0;
      const interestRate = parseFloat(formData.interestRate) / 100 / 12 || 0;
      const loanTerm = parseInt(formData.loanTerm) * 12 || 1;
      const monthlyPayment = principal * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);

      setFormData((prevData) => ({
        ...prevData,
        monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment.toFixed(2),
      }));
    };

    calculateMonthlyPayment();
  }, [formData.loanAmount, formData.interestRate, formData.loanTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, studentId });
  };

  const handleCancel = () => {
    navigate('/loan-app-list'); // Navigate back to the LoanAppList page
  };

  return (
    <div className="mt-3 p-8 rounded border border-gray-200 lg:mx-40 bg-white">
      <h1 className="font-medium text-3xl mb-6 text-center bg-blue-100 p-5 rounded-lg text-grNavTextHov">Edit Loan Application</h1>

      <form onSubmit={handleSubmit}>
        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-x-20">
          {/* Student Information Section */}
          <h2 className="col-span-2 font-medium text-xl mb-4">Student Information</h2>
          <div className="mb-5">
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="nic" className="block mb-2 text-sm font-medium text-gray-900">NIC</label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>

          {/* Academic Information Section */}
          <h2 className="col-span-2 font-medium text-xl mb-4">Academic Information</h2>
          <div className="mb-5">
            <label htmlFor="university" className="block mb-2 text-sm font-medium text-gray-900">University</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="program" className="block mb-2 text-sm font-medium text-gray-900">Program</label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="programFee" className="block mb-2 text-sm font-medium text-gray-900">Program Fee</label>
            <input
              type="number"
              name="programFee"
              value={formData.programFee}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="registrationFees" className="block mb-2 text-sm font-medium text-gray-900">Registration Fees</label>
            <input
              type="number"
              name="registrationFees"
              value={formData.registrationFees}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="totalProgramFee" className="block mb-2 text-sm font-medium text-gray-900">Total Program Fee</label>
            <input
              type="number"
              name="totalProgramFee"
              value={formData.totalProgramFee}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>

          {/* Loan Information Section */}
          <h2 className="col-span-2 font-medium text-xl mb-4">Loan Information</h2>
          <div className="mb-5">
            <label htmlFor="loanAmount" className="block mb-2 text-sm font-medium text-gray-900">Loan Amount</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="interestRate" className="block mb-2 text-sm font-medium text-gray-900">Interest Rate (%)</label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="loanTerm" className="block mb-2 text-sm font-medium text-gray-900">Loan Term (Years)</label>
            <input
              type="number"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="monthlyPayment" className="block mb-2 text-sm font-medium text-gray-900">Monthly Payment</label>
            <input
              type="number"
              name="monthlyPayment"
              value={formData.monthlyPayment}
              onChange={handleChange}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="selectedBank" className="block mb-2 text-sm font-medium text-gray-900">Selected Bank</label>
            <input
              type="text"
              name="selectedBank"
              value={formData.selectedBank}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleCancel}  // Use handleCancel to navigate back
            className="text-red-500 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center"
          >
            <FaSave className="mr-2" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditLoanApplication;
