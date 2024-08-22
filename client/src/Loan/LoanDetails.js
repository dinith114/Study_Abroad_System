import React from 'react';
import { FiPrinter, FiEdit } from 'react-icons/fi';  // Import icons from react-icons

function LoanDetails({ application, onEdit }) {  // Assuming an onEdit function is passed as prop
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative mt-8 p-8 rounded-lg shadow-md border border-gray-200 lg:mx-40 bg-white">
      
      {/* Button Group (Top-Right Corner) */}
      <div className="absolute top-4 right-4 flex space-x-4">
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

      <h1 className="font-semibold text-4xl mb-8 text-center text-blue-600">
        Loan Application Details
      </h1>

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
          <div><strong>Scholarship Amount:</strong> {application.scholarshipAmount}</div>
        </div>
      </div>

      {/* Loan Calculation Section */}
      <div className="mb-8">
        <h2 className="font-semibold text-2xl text-blue-500 mb-4">Loan Calculation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div><strong>Total Program Fee:</strong> {application.totalProgramFee}</div>
          <div><strong>Total Scholarship Amount:</strong> {application.scholarshipAmount}</div>
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
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition transform hover:scale-105">
          Approve Application
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition transform hover:scale-105">
          Reject Application
        </button>
      </div>
    </div>
  );
}

export default LoanDetails;
