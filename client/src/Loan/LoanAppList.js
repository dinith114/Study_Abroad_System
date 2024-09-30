import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlineForm } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageTitle from '../Components/PageTitle';
import UpdateStatus from './UpdateStatus';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { notification } from 'antd';


function LoanAppList() {
  const [loading, setLoading] = useState(false);
  const [loanApplications, setLoanApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/loan-applications/list');
        setLoanApplications(response.data);
      } catch (error) {
        console.error('Error fetching loan applications:', error);
      }
    };

    fetchLoanApplications();
  }, []);

  const calculateSuccessRate = (applications) => {
    const totalApplications = applications.length;
    const approvedApplications = applications.filter(app => app.status === 'Approve').length;
    return totalApplications > 0 ? (approvedApplications / totalApplications) * 100 : 0;
  };

  const handleGenerateReport = () => {
    setLoading(true);
    const successRate = calculateSuccessRate(loanApplications);
    const reportWindow = window.open('', '_blank');
    
    reportWindow.document.write(`
      <html>
        <head>
          <title>Loan Applications Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
            .summary { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <header style="text-align: center; margin-bottom: 20px;">
            <h1>Global Reach</h1>
            <h2>Loan Applications Report</h2>
          </header>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Bank</th>
                <th>Loan Amount</th>
                <th>University</th>
                <th>Program</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${loanApplications.map(row => `
                <tr>
                  <td>${row.firstName} ${row.lastName}</td>
                  <td>${row.selectedBank}</td>
                  <td>${row.totalLoanAmount}</td>
                  <td>${row.university}</td>
                  <td>${row.program}</td>
                  <td>${row.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="summary">
              <p>Total Applications: ${loanApplications.length}</p>
              <p>Approved Applications: ${loanApplications.filter(app => app.status === 'Approve').length}</p>
              <p>Success Rate: ${successRate.toFixed(2)}%</p>
            </div>
        </body>
      </html>
    `);

    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
    setLoading(false);
  };

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleStatusUpdate = (updatedRow) => {
    setLoanApplications((prev) =>
      prev.map((row) => (row._id === updatedRow._id ? updatedRow : row))
    );
    handleCloseModal();
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
  try {
    await axios.delete(`http://localhost:5000/loan-applications/delete/${deleteId}`);
    setLoanApplications(loanApplications.filter((loan) => loan._id !== deleteId));

    // Show success notification
    notification.success({
      message: 'Success',
      description: 'Loan application deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting loan application:', error);
    // Show error notification
    notification.error({
      message: 'Fail',
      description: 'Loan application deleting error.',
    });
  } finally {
    setIsDeleteModalOpen(false);
  }
};


  // Filtered applications based on search query, selected status, and selected bank
  const filteredApplications = loanApplications.filter(app => {
    const matchesSearch = app.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.studentId.toString().includes(searchQuery);

    const matchesStatus = selectedStatus ? app.status === selectedStatus : true;
    const matchesBank = selectedBank ? app.selectedBank === selectedBank : true;

    return matchesSearch && matchesStatus && matchesBank;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedBank('');
  };

  // Count applications by status
  const countApplicationsByStatus = () => {
    return loanApplications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});
  };

  const handleViewStatus = () => {
    setShowStatusModal(true); // Show the modal
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false); // Hide the modal
  };

  const statusCounts = countApplicationsByStatus();

  return (
    <div>
      <div className="my-3 p-8 rounded border border-gray-200 lg:mx-10">
        <PageTitle title="All Loan Applications" />
        <div className="flex flex-wrap justify-between items-center mt-4 space-y-4 md:space-y-0">

  {/* Left Side: Search and Filter Inputs */}
  <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto items-center">
    <input
      type="text"
      placeholder="Search by Name or Student ID"
      className="border p-2 rounded w-full md:w-64"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="border p-2 rounded w-full md:w-48"
    >
      <option value="">All Statuses</option>
      <option value="Approve">Approved</option>
      <option value="Rejected">Rejected</option>
      <option value="Processing">Processing</option>
      <option value="Documenting">Documenting</option>
    </select>
    <select
      value={selectedBank}
      onChange={(e) => setSelectedBank(e.target.value)}
      className="border p-2 rounded w-full md:w-48"
    >
      <option value="">All Banks</option>
      {Array.from(new Set(loanApplications.map(app => app.selectedBank))).map(bank => (
        <option key={bank} value={bank}>{bank}</option>
      ))}
    </select>
    <button
      onClick={resetFilters}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 w-full md:w-auto"
    >
      Reset
    </button>
  </div>

  {/* Right Side: Action Buttons */}
  <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto items-center justify-end">
    <button
      className="bg-grNavTextHov text-white font-bold py-2 px-4 rounded-full hover:bg-grNavText w-full md:w-auto"
      onClick={() => navigate('/loan-app')}
    >
      New Application
    </button>
    <button
      className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-700 w-full md:w-auto"
      onClick={() => navigate('/bank-list')}
    >
      View Banks
    </button>
    <button
      className={`bg-grNavTextHov text-white font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2 w-full md:w-auto ${
        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-grNavText'
      }`}
      onClick={handleGenerateReport}
      disabled={loading}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" />
          <span>Generating...</span>
        </>
      ) : (
        <span>Generate Report</span>
      )}
    </button>
    <button
        className="bg-grNavTextHov text-white font-bold py-2 px-4 rounded-full hover:bg-grNavText"
        onClick={handleViewStatus}
      >
        View Status
      </button>
  </div>
</div>


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">STD ID</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Student Name</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Bank</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Loan Amount</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">University</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Program</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Status</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((row) => (
                <tr key={row._id} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    {row.studentId}
                  </th>
                  <td className="px-6 py-4">
                    {row.firstName} {row.lastName}
                    <br />
                    <span className="text-xs text-gray-500">{row.phoneNumber}</span>
                  </td>
                  <td className="px-6 py-4">{row.selectedBank}</td>
                  <td className="px-6 py-4">{row.totalLoanAmount}</td>
                  <td className="px-6 py-4">{row.university}</td>
                  <td className="px-6 py-4">{row.program}</td>
                  <td className="px-6 py-4">
                    <span className={
                      row.status === 'Rejected' ? 'text-white font-semibold bg-red-700 py-2 px-4 rounded-lg' :
                      row.status === 'Approve' ? 'text-white font-semibold bg-green-700 py-2 px-4 rounded-lg' :
                      row.status === 'Processing' ? 'text-blue-500 font-semibold' :
                      'text-yellow-500 font-semibold'
                    }>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-10 py-4 flex space-x-4">
                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/loan-app-view/${row._id}`)}
                    >
                      <AiOutlineEye size={20} />
                    </button>

                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/loan-app-edit/${row._id}`)}
                    >
                      <AiOutlineEdit size={20} />
                    </button>

                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(row._id)}
                    >
                      <AiOutlineDelete size={20} />
                    </button>

                    <button 
                      className="text-green-500 hover:text-green-700" 
                      onClick={() => handleOpenModal(row)}
                    >
                      <AiOutlineForm size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {isModalOpen && (
        <UpdateStatus 
          onClose={handleCloseModal} 
          row={selectedRow} 
          onStatusUpdate={handleStatusUpdate} 
        />
      )}

      <ConfirmDeleteModal 
        visible={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        message="Are you sure you want to delete this loan application?"
      />
    {/* Status Modal */}
    {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto">
            
            {/* Status Modal Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Status Overview</h3>
              <button onClick={handleCloseStatusModal} className="text-gray-500 hover:text-gray-700">
                &times; {/* Close Button */}
              </button>
            </div>

            {/* Status Modal Content */}
            <div className="flex justify-between items-center">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">Total Applications</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {filteredApplications.length}
                </p>
              </div>

              <div className="w-px bg-gray-300 h-16"></div>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">Approved Applications</h3>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {filteredApplications.filter(app => app.status === 'Approve').length}
                </p>
              </div>

              <div className="w-px bg-gray-300 h-16"></div>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">Success Rate</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {calculateSuccessRate(filteredApplications).toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Status Counts */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Applications by Status</h3>
              <ul>
                {Object.entries(statusCounts).map(([status, count]) => (
                  <li key={status}>
                    {status}: {count} {status === selectedStatus ? '(Filtered)' : ''}
                  </li>
                ))}
              </ul>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-right">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={handleCloseStatusModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanAppList;
