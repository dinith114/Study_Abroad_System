import React from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function LoanAppList() {
  return (
    <div>
      <div className="my-3 p-8 rounded border border-gray-200 lg:mx-10">
        <h1 className="font-medium text-3xl mb-6 text-center bg-blue-100 p-5 rounded-lg text-grNavTextHov">Loan Applications List</h1>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                // Add more rows here as needed
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
                    <span className="text-red-500 font-semibold">{row.status}</span>
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

        {/* Generate Report Button */}
        <div className="text-center mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => alert('Generate Report clicked!')}>
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoanAppList;
