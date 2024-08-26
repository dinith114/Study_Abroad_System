import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlineForm } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageTitle from '../Components/PageTitle';
import UpdateStatus from './UpdateStatus';
import ConfirmDeleteModal from './ConfirmDeleteModal'; // Import the new component

function LoanAppList() {
  const [loading, setLoading] = useState(false);
  const [loanApplications, setLoanApplications] = useState([]); // State to store loan applications
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // Track which item to delete
  const navigate = useNavigate();

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

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Report Generated!');
      setLoading(false);
    }, 2000);
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
    } catch (error) {
      console.error('Error deleting loan application:', error);
      alert('Failed to delete loan application.');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div>
      <div className="my-3 p-8 rounded border border-gray-200 lg:mx-10">
        <PageTitle title="All Loan Applications" />

        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-grNavTextHov text-white font-bold py-2 px-4 rounded-full hover:bg-grNavText"
            onClick={() => navigate('/loan-app')}
          >
            New Application
          </button>
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-700"
            onClick={() => navigate('/bank-list')}
          >
            View Banks
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">STD ID</th>
                <th scope="col" className="px-6 py-3">Student Name</th>
                <th scope="col" className="px-6 py-3">Bank</th>
                <th scope="col" className="px-6 py-3">Loan Amount</th>
                <th scope="col" className="px-6 py-3">University</th>
                <th scope="col" className="px-6 py-3">Program</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loanApplications.map((row) => (
                <tr key={row._id} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
                  <td className="px-6 py-4"> {row.program} </td>
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

        <div className="flex justify-center mt-6">
          <button
            className={`bg-grNavTextHov text-white font-bold py-2 px-4 rounded-full flex justify-center space-x-2 ${
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
        </div>
      </div>
      
      {isModalOpen && (
        <UpdateStatus 
          onClose={handleCloseModal} 
          row={selectedRow} 
          onStatusUpdate={handleStatusUpdate} // Pass the callback function
        />
      )}

      <ConfirmDeleteModal 
        visible={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        message="Are you sure you want to delete this loan application?"
      />
    </div>
  );
}

export default LoanAppList;
