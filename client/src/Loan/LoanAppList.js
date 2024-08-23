import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import PageTitle from '../Components/PageTitle';

function LoanAppList() {
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Report Generated!');
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <div className="my-3 p-8 rounded border border-gray-200 lg:mx-10">
        {/* Page Title */}
        <PageTitle title="All Loan Applications" />
        
        {/* Buttons under Page Title */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-grNavTextHov text-white font-bold py-2 px-4 rounded-full hover:bg-grNavText"
          >
            New Application
          </button>
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-700"
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
                <th scope="col" className="px-6 py-3">Country</th>
                <th scope="col" className="px-6 py-3">University and Program</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'GR2030', name: 'Pasan Mahela', phone: '0712684685', bank: 'Bank of Ceylon', amount: 'Rs. 2,000,000.00', country: 'United Kingdom', university: 'The University of Manchester', program: 'Adult Nursing', status: 'Documenting' },
                { id: 'GR2032', name: 'Pasan Mahela', phone: '0712684685', bank: 'Bank of Ceylon', amount: 'Rs. 2,000,000.00', country: 'United Kingdom', university: 'The University of Manchester', program: 'Adult Nursing', status: 'Processing' },
                { id: 'GR2033', name: 'Pasan Mahela', phone: '0712684685', bank: 'Bank of Ceylon', amount: 'Rs. 2,000,000.00', country: 'United Kingdom', university: 'The University of Manchester', program: 'Adult Nursing', status: 'Accepted' },
              ].map((row) => (
                <tr key={row.id} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {row.id}
                  </th>
                  <td className="px-6 py-4">
                    {row.name}
                    <br />
                    <span className="text-xs text-gray-500">{row.phone}</span>
                  </td>
                  <td className="px-6 py-4">{row.bank}</td>
                  <td className="px-6 py-4">{row.amount}</td>
                  <td className="px-6 py-4">{row.country}</td>
                  <td className="px-6 py-4">
                    {row.university}
                    <br />
                    <span className="text-xs text-gray-500">{row.program}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={
                      row.status === 'Accepted' ? 'text-green-500 font-semibold' : 
                      row.status === 'Processing' ? 'text-orange-500 font-semibold' : 
                      'text-red-500 font-semibold'
                    }>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-10 py-4 flex space-x-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <AiOutlineEye size={20} />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700">
                      <AiOutlineEdit size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <AiOutlineDelete size={20} />
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
    </div>
  );
}

export default LoanAppList;
