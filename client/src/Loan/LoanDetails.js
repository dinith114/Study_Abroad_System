import React, { useState } from 'react';
import { FiPrinter, FiEdit } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon
import PageTitle from '../Components/PageTitle';

function LoanDetails({ application, onEdit }) {
  const [loadingApprove, setLoadingApprove] = useState(false); // State for Approve loading
  const [loadingReject, setLoadingReject] = useState(false); // State for Reject loading

  const handlePrint = () => {
    window.print();
  };

  const handleApprove = () => {
    setLoadingApprove(true); // Start loading
    // Simulate an API call or some asynchronous task
    setTimeout(() => {
      alert('Application Approved!');
      setLoadingApprove(false); // Stop loading
    }, 2000); // Simulate 2 seconds delay
  };

  const handleReject = () => {
    setLoadingReject(true); // Start loading
    // Simulate an API call or some asynchronous task
    setTimeout(() => {
      alert('Application Rejected!');
      setLoadingReject(false); // Stop loading
    }, 2000); // Simulate 2 seconds delay
  };

  return (
    <div className="relative mt-8 p-8 rounded-lg shadow-md border border-gray-200 lg:mx-40 bg-white">
      
      {/* Page Title */}
      <PageTitle title="Loan Application Details" />
      
      {/* Button Group (Under Page Title) */}
      <div className="flex justify-end space-x-4 mb-8">
        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="bg-gray-100 p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          <FiPrinter className="text-2xl text-gray-700" />
        </button>
        
        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="bg-gray-100 p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          <FiEdit className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Student Information Section */}
      <div className="mb-8">
        <h2 className="font-semibold text-2xl text-blue-500 mb-4">Student Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div><strong>First Name:</strong> {application.firstName}</div>
          <div><strong>Last Name:</strong> {application.lastName}</div>
          <div><strong>Address:</strong> {application.address}</div>
          <div><strong>Email:</strong> {application.email}</div>
          <div><strong>Phone Number:</strong> {application.phoneNumber}</div>
          <div><strong>Gender:</strong> {application.gender}</div>
          <div><strong>Date of Birth:</strong> {application.dateOfBirth}</div>
          <div><strong>NIC Number:</strong> {application.nic}</div>
        </div>
      </div>

      {/* Course Information Section */}
      <div className="mb-8">
        <h2 className="font-semibold text-2xl text-blue-500 mb-4">Course Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div><strong>University:</strong> {application.university}</div>
          <div><strong>Program:</strong> {application.program}</div>
          <div><strong>Program Fee:</strong> {application.programFee}</div>
          <div><strong>Registration Fees:</strong> {application.registrationFees}</div>
        </div>
      </div>

      {/* Loan Calculation Section */}
      <div className="mb-8">
        <h2 className="font-semibold text-2xl text-blue-500 mb-4">Loan Calculation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div><strong>Total Program Fee:</strong> {application.totalProgramFee}</div>
          <div><strong>Total Registration Fees:</strong> {application.registrationFees}</div>
          <div><strong>Total Loan Amount:</strong> {application.totalLoanAmount}</div>
        </div>
      </div>

      {/* Selected Bank Section */}
      <div className="mb-8">
        <h2 className="font-semibold text-2xl text-blue-500 mb-4">Selected Bank</h2>
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-300">
          <strong>Bank:</strong> {application.selectedBank}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-10">
        {/* Approve Button */}
        <button
          onClick={handleApprove}
          className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition transform hover:scale-105 flex justify-center w-60 ${
            loadingApprove ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loadingApprove} // Disable button when loading
        >
          {loadingApprove ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Approving...
            </>
          ) : (
            'Approve Application'
          )}
        </button>

        {/* Reject Button */}
        <button
          onClick={handleReject}
          className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition transform hover:scale-105 flex justify-center w-60 ${
            loadingReject ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loadingReject} // Disable button when loading
        >
          {loadingReject ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Rejecting...
            </>
          ) : (
            'Reject Application'
          )}
        </button>
      </div>
    </div>
  );
}

export default LoanDetails;
